<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\SiteContentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExecutiveBackendTest extends TestCase
{
    use RefreshDatabase;

    public function test_executive_can_open_the_admin_dashboard(): void
    {
        $executive = User::factory()->executive()->create();

        $this->actingAs($executive)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_member_cannot_open_the_admin_dashboard(): void
    {
        $member = User::factory()->create([
            'role' => User::ROLE_MEMBER,
            'is_executive' => false,
        ]);

        $this->actingAs($member)
            ->get(route('admin.dashboard'))
            ->assertRedirect(route('home'));
    }

    public function test_assigned_admin_can_update_website_content(): void
    {
        $executive = User::factory()->admin()->create();
        $payload = SiteContentRepository::defaults();
        $payload['hero']['headline'] = "Unity first.\nLuac next.";
        $payload['hero']['subtext'] = 'Updated from the executive backend.';

        $this->actingAs($executive)
            ->put(route('admin.content.site.update'), $payload)
            ->assertRedirect(route('admin.content.site.edit'));

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/main/index')
                ->where('site.hero.headline', "Unity first.\nLuac next.")
                ->where('site.hero.subtext', 'Updated from the executive backend.'));
    }

    public function test_guest_contact_form_is_stored_for_executives(): void
    {
        $this->from(route('contact'))
            ->post(route('contact.store'), [
                'name' => 'Nyadak Suzan',
                'email' => 'nyadak@example.com',
                'phone' => '0927 111 222',
                'subject' => 'Volunteering',
                'message' => 'I would like to help with programs.',
            ])
            ->assertRedirect(route('contact'));

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Nyadak Suzan',
            'email' => 'nyadak@example.com',
            'subject' => 'Volunteering',
            'status' => 'new',
        ]);

        $executive = User::factory()->executive()->create();

        $this->actingAs($executive)
            ->get(route('admin.contacts.index'))
            ->assertOk();
    }
}
