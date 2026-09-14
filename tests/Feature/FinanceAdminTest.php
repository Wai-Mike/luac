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

    public function test_paid_purchase_request_items_appear_in_the_monthly_expense_report(): void
    {
        $department = Department::factory()->create(['name' => 'Logistics']);
        $secretary = User::factory()->executive()->create(['department_id' => $department->id]);
        $chairman = User::factory()->chairman()->create();

        $this->actingAs($secretary)
            ->post(route('admin.operations.purchase-requests.store'), [
                'title' => 'Water for youth forum',
                'purpose' => 'Drinking water for 200 guests',
                'currency' => 'SSP',
                'payment_method' => 'cash',
                'items' => [
                    ['description' => 'Bottled water', 'quantity' => 10, 'unit_cost' => 5],
                    ['description' => 'Ice blocks', 'quantity' => 4, 'unit_cost' => 10],
                ],
            ])
            ->assertRedirect();

        $order = \App\Models\PurchaseRequest::query()->first();
        $this->assertNotNull($order);
        $this->assertEquals(90, (float) $order->amount);

        $this->actingAs($chairman)
            ->post(route('admin.operations.purchase-requests.review', $order), ['decision' => 'reviewed'])
            ->assertRedirect();
        $this->actingAs($chairman)
            ->post(route('admin.operations.purchase-requests.approve', $order))
            ->assertRedirect();

        $this->assertDatabaseMissing('association_expenses', ['title' => 'Bottled water']);

        $this->actingAs($chairman)
            ->post(route('admin.operations.purchase-requests.pay', $order))
            ->assertRedirect();

        $this->assertDatabaseHas('association_expenses', [
            'title' => 'Bottled water',
            'amount' => 50,
            'currency' => 'ssp',
            'category' => AssociationExpense::CATEGORY_PROCUREMENT,
            'department_id' => $department->id,
            'source_type' => 'purchase_request_item',
        ]);
        $this->assertDatabaseHas('association_expenses', [
            'title' => 'Ice blocks',
            'amount' => 40,
            'category' => AssociationExpense::CATEGORY_PROCUREMENT,
        ]);

        $report = \App\Support\MonthlyFinanceReport::forMonth((int) now()->year, (int) now()->month);

        $this->assertEquals(90.0, $report['expenses']['total']['ssp']);
        $this->assertEquals(0.0, $report['expenses']['total']['usd']);
        $procurement = collect($report['expenses']['by_category'])->firstWhere('key', 'procurement');
        $this->assertEquals(90.0, $procurement['ssp']);
        $this->assertEquals(2, $procurement['count']);
        $this->assertTrue(collect($report['expenses']['items'])->contains(fn (array $item) => $item['title'] === 'Bottled water'));
    }

    public function test_settled_logistics_invoice_posts_to_monthly_expenses_without_duplicating_a_paid_order(): void
    {
        $department = Department::factory()->create(['name' => 'Finance & Administration']);
        $officer = User::factory()->executive()->create(['department_id' => $department->id]);

        $this->actingAs($officer)
            ->post(route('admin.operations.logistics.store'), [
                'title' => 'Printer toner invoice',
                'kind' => 'invoice',
                'currency' => 'SSP',
                'vendor' => 'Juba Office Supplies',
                'items' => [
                    ['description' => 'Toner cartridge', 'quantity' => 2, 'unit' => 'pcs', 'unit_cost' => 15000],
                ],
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('association_expenses', [
            'title' => 'Printer toner invoice',
            'amount' => 30000,
            'category' => AssociationExpense::CATEGORY_PROCUREMENT,
            'source_type' => 'logistics',
        ]);

        $this->actingAs($officer)
            ->post(route('admin.operations.logistics.store'), [
                'title' => 'Catering quotation',
                'kind' => 'quotation',
                'currency' => 'SSP',
                'items' => [
                    ['description' => 'Lunch buffet', 'quantity' => 50, 'unit' => 'pax', 'unit_cost' => 20],
                ],
            ])
            ->assertRedirect();

        $this->assertDatabaseMissing('association_expenses', ['title' => 'Catering quotation']);

        $report = \App\Support\MonthlyFinanceReport::forMonth((int) now()->year, (int) now()->month);
        $this->assertEquals(30000.0, $report['expenses']['total']['ssp']);
    }

    public function test_receipt_linked_to_a_paid_purchase_request_is_not_posted_twice(): void
    {
        $department = Department::factory()->create();
        $secretary = User::factory()->executive()->create(['department_id' => $department->id]);
        $chairman = User::factory()->chairman()->create();

        $this->actingAs($secretary)
            ->post(route('admin.operations.purchase-requests.store'), [
                'title' => 'Hall chairs',
                'currency' => 'SSP',
                'items' => [
                    ['description' => 'Plastic chairs', 'quantity' => 5, 'unit_cost' => 20],
                ],
            ])
            ->assertRedirect();

        $order = \App\Models\PurchaseRequest::query()->first();
        $this->actingAs($chairman)->post(route('admin.operations.purchase-requests.review', $order), ['decision' => 'reviewed']);
        $this->actingAs($chairman)->post(route('admin.operations.purchase-requests.approve', $order));
        $this->actingAs($chairman)->post(route('admin.operations.purchase-requests.pay', $order));

        $this->actingAs($secretary)
            ->post(route('admin.operations.receipts.store'), [
                'title' => 'Chair payment receipt',
                'vendor' => 'Mama Mary',
                'amount' => 100,
                'currency' => 'SSP',
                'purchase_request_id' => $order->id,
            ])
            ->assertRedirect();

        $this->assertEquals(1, AssociationExpense::query()->count());
        $this->assertEquals(100.0, (float) AssociationExpense::query()->sum('amount'));

        $this->actingAs($secretary)
            ->post(route('admin.operations.receipts.store'), [
                'title' => 'Taxi fare',
                'vendor' => 'City cab',
                'amount' => 15,
                'currency' => 'USD',
            ])
            ->assertRedirect();

        $report = \App\Support\MonthlyFinanceReport::forMonth((int) now()->year, (int) now()->month);
        $this->assertEquals(100.0, $report['expenses']['total']['ssp']);
        $this->assertEquals(15.0, $report['expenses']['total']['usd']);
    }
}
