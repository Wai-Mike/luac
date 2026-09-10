<?php

namespace Tests\Feature;

use App\Models\AdminNotification;
use App\Models\User;
use App\Models\YouthMember;
use App\Models\YouthMembership;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class YouthMembershipTest extends TestCase
{
    use RefreshDatabase;

    public function test_census_registration_opens_this_years_membership_and_notifies_admins(): void
    {
        $this->post(route('youth-census.store'), $this->censusPayload())->assertRedirect(route('youth-census.thank-you'));

        $member = YouthMember::query()->first();
        $this->assertNotNull($member);
        $this->assertSame(20, $member->age);

        $this->assertDatabaseHas('youth_memberships', [
            'youth_member_id' => $member->id,
            'year' => (int) now()->year,
            'amount_paid' => 0,
        ]);

        $this->assertDatabaseHas('admin_notifications', [
            'type' => 'census',
            'title' => 'New youth census registration',
        ]);
    }

    public function test_census_export_includes_age_and_omits_skills(): void
    {
        $this->post(route('youth-census.store'), $this->censusPayload())->assertRedirect();

        $admin = User::factory()->admin()->create();
        $response = $this->actingAs($admin)->get(route('admin.youth-members.export'));

        $response->assertOk();
        $xml = $response->streamedContent();

        $this->assertStringContainsString('Nyandeng', $xml);
        $this->assertStringContainsString('Age', $xml);
        $this->assertStringContainsString('Sports', $xml);
        $this->assertStringNotContainsString('Skills', $xml);
        $this->assertStringNotContainsString('Welding-secret', $xml);
    }

    public function test_admin_can_record_a_yearly_membership_fee(): void
    {
        $this->post(route('youth-census.store'), $this->censusPayload())->assertRedirect();
        $member = YouthMember::query()->first();
        $admin = User::factory()->admin()->create();
        $year = (int) now()->year;

        $this->actingAs($admin)
            ->put(route('admin.memberships.update', $member), [
                'year' => $year,
                'amount_paid' => 500,
                'currency' => 'ssp',
            ])
            ->assertRedirect(route('admin.memberships.index', ['year' => $year]));

        $this->assertDatabaseHas('youth_memberships', [
            'youth_member_id' => $member->id,
            'year' => $year,
            'amount_paid' => 500,
            'currency' => 'ssp',
            'recorded_by' => $admin->id,
        ]);

        $this->actingAs($admin)
            ->get(route('admin.memberships.index', ['year' => $year]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('admin/memberships/index')
                ->where('year', $year)
                ->where('members.data.0.first_name', 'Nyandeng')
                ->where('members.data.0.age', 20)
                ->where('members.data.0.amount_paid', '500.00'));
    }

    public function test_membership_export_includes_age_and_fees(): void
    {
        $this->post(route('youth-census.store'), $this->censusPayload())->assertRedirect();
        $member = YouthMember::query()->first();
        YouthMembership::query()->where('youth_member_id', $member->id)->update([
            'amount_paid' => 250,
            'currency' => 'ssp',
        ]);

        $admin = User::factory()->admin()->create();
        $response = $this->actingAs($admin)->get(route('admin.memberships.export', ['year' => now()->year]));

        $response->assertOk();
        $xml = $response->streamedContent();
        $this->assertStringContainsString('Nyandeng', $xml);
        $this->assertStringContainsString('Age', $xml);
        $this->assertStringContainsString('250', $xml);
        $this->assertStringNotContainsString('Welding-secret', $xml);
    }

    public function test_admin_can_open_and_mark_notifications_read(): void
    {
        $this->post(route('youth-census.store'), $this->censusPayload())->assertRedirect();
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('admin.notifications.unread', 1)
                ->where('admin.notifications.items.0.title', 'New youth census registration'));

        $notification = AdminNotification::query()->first();
        $this->actingAs($admin)
            ->post(route('admin.notifications.read', $notification))
            ->assertRedirect(route('admin.youth-members.show', YouthMember::query()->first()));

        $this->assertNotNull($notification->fresh()->read_at);

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertInertia(fn ($page) => $page->where('admin.notifications.unread', 0));
    }

    public function test_admin_can_add_a_paid_member_without_census_registration(): void
    {
        $admin = User::factory()->admin()->create();
        $year = (int) now()->year;

        $this->actingAs($admin)
            ->post(route('admin.memberships.store'), [
                'first_name' => 'Akuol',
                'last_name' => 'Deng',
                'age' => 22,
                'gender' => 'female',
                'phone' => '0927 333 444',
                'payam' => 'Mareng',
                'year' => $year,
                'amount_paid' => 1000,
                'currency' => 'ssp',
            ])
            ->assertRedirect(route('admin.memberships.index', ['year' => $year]));

        $member = YouthMember::query()->where('first_name', 'Akuol')->first();
        $this->assertNotNull($member);
        $this->assertSame('membership', $member->source);
        $this->assertSame(22, $member->age);

        $this->assertDatabaseHas('youth_memberships', [
            'youth_member_id' => $member->id,
            'year' => $year,
            'amount_paid' => 1000,
            'currency' => 'ssp',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.memberships.index', ['year' => $year]))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('members.data.0.first_name', 'Akuol')
                ->where('members.data.0.age', 22)
                ->where('members.data.0.source', 'membership')
                ->where('members.data.0.amount_paid', '1000.00'));

        $this->actingAs($admin)
            ->get(route('admin.youth-members.index'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->has('members.data', 0));
    }

    /**
     * @param  array<string, mixed>  $overrides
     * @return array<string, mixed>
     */
    protected function censusPayload(array $overrides = []): array
    {
        return array_merge([
            'first_name' => 'Nyandeng',
            'last_name' => 'Mabior',
            'gender' => 'female',
            'date_of_birth' => now()->subYears(20)->startOfDay()->toDateString(),
            'phone' => '0927 111 222',
            'email' => 'nyandeng@example.com',
            'county' => 'PIGI (Khorfulus)',
            'payam' => 'Khorfulus',
            'boma' => 'Luac',
            'education_level' => 'Secondary',
            'current_school' => 'Malou Secondary',
            'employment_status' => 'Student',
            'skills' => ['Welding-secret'],
            'interests' => ['Sports'],
            'heard_about_layya' => 'Church',
        ], $overrides);
    }
}
