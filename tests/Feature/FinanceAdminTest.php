<?php

namespace Tests\Feature;

use App\Models\AssociationExpense;
use App\Models\Department;
use App\Models\Donation;
use App\Models\FundraisingCampaign;
use App\Models\User;
use App\Models\YouthMember;
use App\Models\YouthMembership;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FinanceAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_open_the_finances_page(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.finances.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('admin/finances/index')
                ->has('report.income.total')
                ->has('report.expenses.total')
                ->has('categories'));
    }

    public function test_department_head_can_record_a_detailed_expense(): void
    {
        $department = Department::factory()->create(['name' => 'Programs & Welfare']);
        $head = User::factory()->executive()->create(['department_id' => $department->id]);

        $this->actingAs($head)
            ->post(route('admin.finances.expenses.store'), [
                'department_id' => $department->id,
                'category' => AssociationExpense::CATEGORY_TRANSPORT,
                'title' => 'Fuel for Juba delegation',
                'detail' => 'Transport for three council members to the state meeting.',
                'amount' => 85000,
                'currency' => 'ssp',
                'spent_at' => now()->toDateString(),
                'year' => now()->year,
                'month' => now()->month,
            ])
            ->assertRedirect(route('admin.finances.index', [
                'year' => now()->year,
                'month' => now()->month,
            ]));

        $this->assertDatabaseHas('association_expenses', [
            'department_id' => $department->id,
            'recorded_by' => $head->id,
            'category' => 'transport',
            'title' => 'Fuel for Juba delegation',
            'amount' => 85000,
            'currency' => 'ssp',
        ]);
    }

    public function test_department_head_expense_stays_on_their_department(): void
    {
        $own = Department::factory()->create(['name' => 'ICT & Information']);
        $other = Department::factory()->create(['name' => 'Executive Office']);
        $head = User::factory()->executive()->create(['department_id' => $own->id]);

        $this->actingAs($head)
            ->post(route('admin.finances.expenses.store'), [
                'department_id' => $other->id,
                'category' => AssociationExpense::CATEGORY_OPERATIONS,
                'title' => 'Printer toner',
                'detail' => 'Office supplies for the ICT desk.',
                'amount' => 40,
                'currency' => 'usd',
                'spent_at' => now()->toDateString(),
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('association_expenses', [
            'title' => 'Printer toner',
            'department_id' => $own->id,
            'recorded_by' => $head->id,
        ]);
    }

    public function test_monthly_report_export_includes_memberships_donations_and_expenses(): void
    {
        $admin = User::factory()->admin()->create();
        $department = Department::factory()->create(['name' => 'Finance & Administration']);

        $member = YouthMember::query()->create([
            'first_name' => 'Nyandeng',
            'last_name' => 'Mabior',
            'source' => 'census',
        ]);
        YouthMembership::query()->where('youth_member_id', $member->id)->update([
            'amount_paid' => 500,
            'currency' => 'ssp',
            'paid_at' => now(),
        ]);

        $campaign = FundraisingCampaign::factory()->create(['title' => 'Youth Skills Training']);
        Donation::factory()->create([
            'fundraising_campaign_id' => $campaign->id,
            'donor_name' => 'Akuol Deng',
            'amount' => 25,
            'currency' => 'usd',
            'donated_at' => now(),
        ]);

        AssociationExpense::query()->create([
            'department_id' => $department->id,
            'recorded_by' => $admin->id,
            'category' => AssociationExpense::CATEGORY_MEETINGS,
            'title' => 'Council sitting lunch',
            'detail' => 'Meals for the monthly council meeting.',
            'amount' => 120000,
            'currency' => 'ssp',
            'spent_at' => now()->toDateString(),
        ]);

        $response = $this->actingAs($admin)->get(route('admin.finances.export', [
            'year' => now()->year,
            'month' => now()->month,
        ]));

        $response->assertOk();
        $xml = $response->streamedContent();
        $this->assertStringContainsString('Nyandeng', $xml);
        $this->assertStringContainsString('Akuol Deng', $xml);
        $this->assertStringContainsString('Council sitting lunch', $xml);
        $this->assertStringContainsString('Membership fees', $xml);
        $this->assertStringContainsString('Donations &amp; fundraising', $xml);
        $this->assertStringContainsString('Meetings &amp; delegations', $xml);
    }
}
