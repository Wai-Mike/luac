<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\DepartmentBudget;
use App\Models\Donation;
use App\Models\FundraisingCampaign;
use App\Models\PurchaseRequest;
use App\Models\User;
use App\Support\AssociationAms;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AssociationAmsTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_includes_the_ams_overview(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('admin/dashboard')
                ->where('ams.ready', true)
                ->where('ams.architecture', 'Integrated Association Management System (AMS)')
                ->has('ams.departments', 7)
                ->has('ams.income_statement')
                ->has('ams.trial_balance')
                ->has('ams.workflow.steps', 4));
    }

    public function test_operating_desks_and_chart_of_accounts_are_provisioned(): void
    {
        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.dashboard'))
            ->assertOk();

        $this->assertTrue(Department::query()->where('code', 'EDU')->where('slug', 'education')->exists());
        $this->assertTrue(Department::query()->where('code', 'LOG')->exists());
        $this->assertDatabaseHas('ledger_accounts', ['code' => '1100', 'name' => 'Cash on hand']);
        $this->assertDatabaseHas('department_budgets', [
            'year' => now()->year,
            'currency' => 'SSP',
        ]);
    }

    public function test_ledger_stays_in_balance_after_income_and_expense_posting(): void
    {
        $campaign = FundraisingCampaign::factory()->create([
            'title' => 'Youth skills grant',
        ]);

        Donation::factory()->create([
            'fundraising_campaign_id' => $campaign->id,
            'donor_name' => 'Partner Trust',
            'amount' => 250000,
            'currency' => 'ssp',
            'donated_at' => now(),
        ]);

        AssociationAms::ensureStructure();
        AssociationAms::syncLedgers();
        $snapshot = AssociationAms::snapshot(User::factory()->admin()->create());

        $this->assertTrue($snapshot['trial_balance']['balanced']);
        $this->assertEquals(250000.0, $snapshot['income_statement']['income']['grants']['ssp']);
        $this->assertEquals(250000.0, $snapshot['income_statement']['income_total']['ssp']);
    }

    public function test_requisition_over_department_cap_is_placed_on_hold(): void
    {
        AssociationAms::ensureStructure();
        $education = Department::query()->where('code', 'EDU')->firstOrFail();
        DepartmentBudget::query()->where('department_id', $education->id)->where('year', now()->year)->where('currency', 'SSP')->update(['amount' => 1000]);

        $secretary = User::factory()->executive()->create(['department_id' => $education->id]);

        $this->actingAs($secretary)
            ->post(route('admin.operations.purchase-requests.store'), [
                'title' => 'Workshop materials',
                'purpose' => 'Over-cap request',
                'currency' => 'SSP',
                'payment_method' => 'cash',
                'items' => [
                    ['description' => 'Kits', 'quantity' => 10, 'unit_cost' => 500],
                ],
            ])
            ->assertRedirect();

        $order = PurchaseRequest::query()->first();
        $this->assertTrue((bool) $order->budget_hold);
        $this->assertNotEmpty($order->hold_reason);

        $this->actingAs(User::factory()->chairman()->create())
            ->from(route('admin.operations.index'))
            ->post(route('admin.operations.purchase-requests.review', $order), ['decision' => 'reviewed'])
            ->assertRedirect(route('admin.operations.index'))
            ->assertSessionHas('error');
    }

    public function test_finance_can_release_a_budget_hold(): void
    {
        AssociationAms::ensureStructure();
        $education = Department::query()->where('code', 'EDU')->firstOrFail();
        DepartmentBudget::query()->where('department_id', $education->id)->update(['amount' => 500]);
        $secretary = User::factory()->executive()->create(['department_id' => $education->id]);
        $finance = User::factory()->admin()->create(['office' => User::OFFICE_FINANCE]);

        $this->actingAs($secretary)
            ->post(route('admin.operations.purchase-requests.store'), [
                'title' => 'Chairs',
                'currency' => 'SSP',
                'items' => [['description' => 'Plastic chairs', 'quantity' => 20, 'unit_cost' => 100]],
            ])
            ->assertRedirect();

        $order = PurchaseRequest::query()->first();
        $this->assertTrue((bool) $order->budget_hold);

        $this->actingAs($finance)
            ->post(route('admin.operations.purchase-requests.release-hold', $order))
            ->assertRedirect();

        $this->assertFalse((bool) $order->fresh()->budget_hold);
    }
}
