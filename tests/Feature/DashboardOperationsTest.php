<?php

namespace Tests\Feature;

use App\Models\ActivityLog;
use App\Models\AssociationMeeting;
use App\Models\ContactMessage;
use App\Models\Department;
use App\Models\User;
use App\Models\YouthMember;
use App\Support\LuacPayams;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardOperationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_payam_chart_only_lists_the_three_selected_payams(): void
    {
        YouthMember::query()->create([
            'first_name' => 'Akol',
            'last_name' => 'Deng',
            'gender' => 'male',
            'payam' => 'Belawic',
            'source' => 'census',
        ]);
        YouthMember::query()->create([
            'first_name' => 'Nyandeng',
            'last_name' => 'Ayen',
            'gender' => 'female',
            'payam' => 'Khorfulus',
            'source' => 'census',
        ]);

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('charts.payam', fn ($rows) => collect($rows)->pluck('name')->values()->all() === LuacPayams::ALL)
                ->where('census.payams', fn ($rows) => collect($rows)->pluck('name')->values()->all() === LuacPayams::ALL)
                ->where('census.payams.0.total', 1));
    }

    public function test_activity_log_names_census_and_feedback(): void
    {
        YouthMember::query()->create([
            'first_name' => 'Akol',
            'last_name' => 'Deng',
            'gender' => 'male',
            'payam' => 'Wunlem',
            'source' => 'census',
        ]);

        ContactMessage::query()->create([
            'name' => 'Mary Ayen',
            'email' => 'mary@example.com',
            'subject' => 'Partnership',
            'message' => 'We would like to partner.',
            'status' => 'new',
        ]);

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'census.registered',
        ]);
        $this->assertTrue(ActivityLog::query()->where('description', 'like', 'Census registration:%')->exists());
        $this->assertTrue(ActivityLog::query()->where('description', 'like', 'Contact feedback:%')->exists());

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('recent_activity.0.kind', fn ($kind) => in_array($kind, ['Census', 'Feedback'], true)));
    }

    public function test_moderation_page_includes_contact_feedback(): void
    {
        ContactMessage::query()->create([
            'name' => 'Mary Ayen',
            'email' => 'mary@example.com',
            'subject' => 'Partnership',
            'message' => 'We would like to partner.',
            'status' => 'new',
        ]);

        $this->actingAs(User::factory()->admin()->create())
            ->get(route('admin.content.comments'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('admin/content/comments')
                ->where('messages.data.0.name', 'Mary Ayen'));
    }

    public function test_past_scheduled_meetings_are_marked_done(): void
    {
        $executive = User::factory()->executive()->create();
        $meeting = AssociationMeeting::query()->create([
            'title' => 'Old council sitting',
            'starts_at' => now()->subDay(),
            'status' => 'scheduled',
            'created_by' => $executive->id,
        ]);

        $this->actingAs($executive)
            ->get(route('admin.operations.index'))
            ->assertOk();

        $this->assertSame('completed', $meeting->fresh()->status);
    }

    public function test_chairman_can_assign_a_department_head(): void
    {
        $chairman = User::factory()->chairman()->create();
        $head = User::factory()->executive()->create(['name' => 'Nyadak Suzan']);
        $department = Department::query()->create([
            'name' => 'Programs & Welfare',
            'slug' => 'programs-welfare',
            'status' => 'active',
        ]);

        $this->actingAs($chairman)
            ->put(route('admin.departments.update', $department), [
                'name' => $department->name,
                'slug' => $department->slug,
                'description' => 'Youth programs',
                'status' => 'active',
                'head_id' => $head->id,
                'member_ids' => [$head->id],
            ])
            ->assertRedirect(route('admin.departments.index'));

        $this->assertSame($head->id, $department->fresh()->head_id);
        $this->assertSame($department->id, $head->fresh()->department_id);
    }

    public function test_settings_are_persisted(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.settings.update'), [
                'site_name' => 'LAYYA',
                'site_description' => 'Youth for Luac',
                'contact_email' => 'info@luac-akook-yieu.org',
                'appearance' => 'dark',
                'notifications' => ['email' => true, 'census' => true, 'feedback' => false, 'donations' => true],
                'security' => ['session_timeout' => 60, 'require_verified_email' => true],
                'integrations' => ['whatsapp' => '0927 779 952', 'smtp_from' => 'info@luac-akook-yieu.org'],
            ])
            ->assertRedirect(route('admin.settings'));

        $this->actingAs($admin)
            ->get(route('admin.settings'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('settings.appearance', 'dark')
                ->where('settings.notifications.feedback', false));
    }

    public function test_logistics_documents_are_printable_with_layya_letterhead(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.operations.logistics.store'), [
                'title' => 'Tawus Day transport',
                'kind' => 'waybill',
                'party_from' => 'LAYYA Juba office',
                'party_to' => 'Tawus Hub',
                'currency' => 'SSP',
                'details' => [
                    'origin' => 'Juba',
                    'destination' => 'Tawus Hub',
                    'vehicle_reg' => 'SSD-441',
                    'driver_name' => 'Akol Deng',
                    'payment_method' => 'bank_transfer',
                    'bank_details' => 'KCB Juba · LAYYA · 123456',
                ],
                'items' => [
                    ['description' => 'Chairs', 'quantity' => 20, 'unit' => 'pcs', 'unit_cost' => 2],
                ],
            ])
            ->assertRedirect();

        $document = \App\Models\LogisticsDocument::query()->first();
        $this->assertNotNull($document);
        $this->assertStringStartsWith('LAYYA-WB-', $document->reference);

        $this->actingAs($admin)
            ->get(route('admin.operations.logistics.show', $document))
            ->assertOk()
            ->assertSee('Luac Akook Yieu Youth Association')
            ->assertSee('Waybill')
            ->assertSee('Tawus Day transport')
            ->assertSee('SSD-441')
            ->assertSee('Chairs')
            ->assertSee('South Sudanese pounds (SSP)')
            ->assertSee('Bank transfer')
            ->assertSee('KCB Juba')
            ->assertSee('rel="icon"', false)
            ->assertSee('Print');

        $this->actingAs($admin)
            ->get(route('admin.operations.logistics.download', $document))
            ->assertOk()
            ->assertHeader('content-disposition')
            ->assertSee($document->reference);
    }

    public function test_purchase_request_order_can_be_printed(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.operations.purchase-requests.store'), [
                'title' => 'Water for youth forum',
                'purpose' => 'Drinking water for 200 guests',
                'currency' => 'SSP',
                'payment_method' => 'cash',
                'items' => [
                    ['description' => 'Bottled water', 'quantity' => 10, 'unit_cost' => 5],
                ],
            ])
            ->assertRedirect();

        $order = \App\Models\PurchaseRequest::query()->first();

        $this->actingAs($admin)
            ->get(route('admin.operations.purchase-requests.show', $order))
            ->assertOk()
            ->assertSee('Purchase request order')
            ->assertSee('Water for youth forum')
            ->assertSee('Bottled water')
            ->assertSee('South Sudanese pounds (SSP)')
            ->assertSee('Cash')
            ->assertSee($order->reference);
    }

    public function test_receipts_are_printable_with_layya_letterhead(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.operations.receipts.store'), [
                'title' => 'Printer payment',
                'vendor' => 'Juba Office Supplies',
                'amount' => 150000,
                'currency' => 'SSP',
                'payment_method' => 'cash',
                'notes' => 'Paid for chairman office printer',
            ])
            ->assertRedirect();

        $receipt = \App\Models\AssociationReceipt::query()->first();
        $this->assertNotNull($receipt);
        $this->assertStringStartsWith('LAYYA-RCT-', $receipt->reference);

        $this->actingAs($admin)
            ->get(route('admin.operations.receipts.show', $receipt))
            ->assertOk()
            ->assertSee('Luac Akook Yieu Youth Association')
            ->assertSee('Official receipt')
            ->assertSee('Printer payment')
            ->assertSee('Juba Office Supplies')
            ->assertSee('South Sudanese pounds (SSP)')
            ->assertSee('Cash')
            ->assertSee($receipt->reference)
            ->assertSee('Print');

        $this->actingAs($admin)
            ->get(route('admin.operations.receipts.download', $receipt))
            ->assertOk()
            ->assertHeader('content-disposition')
            ->assertSee($receipt->reference);
    }

    public function test_event_planning_papers_follow_the_six_phase_method(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.operations.events.store'), [
                'title' => 'Tawus Hub launch',
                'kind' => 'inauguration',
                'venue' => 'Tawus Hub',
                'audience' => 'Government officials and youth delegates',
                'objectives' => 'Launch the hub and brief partners',
                'kpis' => '200 guests, 5 press stories',
                'currency' => 'SSP',
                'contingency_percent' => 12,
                'budget_items' => [
                    ['category' => 'Venue & Facilities', 'elements' => 'Hall rental', 'unit_metric' => 'Flat fee', 'quantity' => 1, 'unit_cost' => 100000],
                ],
                'plan' => [
                    'agenda' => [['time' => '09:00', 'item' => 'Ribbon cutting', 'owner' => 'Chairman']],
                ],
            ])
            ->assertRedirect();

        $event = \App\Models\AssociationEvent::query()->first();
        $this->assertNotNull($event);
        $this->assertSame('inauguration', $event->kind);
        $this->assertStringStartsWith('LAYYA-EVT-', $event->reference);

        $this->actingAs($admin)
            ->get(route('admin.operations.events.documents.show', [$event, 'brief']))
            ->assertOk()
            ->assertSee('Event concept and governance brief')
            ->assertSee('Tawus Hub launch')
            ->assertSee('Launch the hub')
            ->assertSee('Luac Akook Yieu Youth Association');

        $this->actingAs($admin)
            ->get(route('admin.operations.events.documents.show', [$event, 'budget']))
            ->assertOk()
            ->assertSee('Venue & Facilities')
            ->assertSee('Contingency')
            ->assertSee('South Sudanese pounds (SSP)');

        $this->actingAs($admin)
            ->get(route('admin.operations.events.documents.download', [$event, 'agenda']))
            ->assertOk()
            ->assertHeader('content-disposition')
            ->assertSee('Ribbon cutting');
    }
}
