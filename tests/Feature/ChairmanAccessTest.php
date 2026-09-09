<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\User;
use App\Support\SiteContentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChairmanAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_chairman_can_create_an_executive_and_assign_admin(): void
    {
        $department = Department::factory()->create([
            'name' => 'ICT & Information',
            'slug' => 'ict-information',
        ]);
        $chairman = User::factory()->chairman()->create();

        $this->actingAs($chairman)
            ->post(route('admin.users.store'), [
                'name' => 'Nyadak Suzan',
                'email' => 'nyadak@layya.org',
                'password' => 'Layya2026',
                'role' => User::ROLE_ADMIN,
                'department_id' => $department->id,
            ])
            ->assertRedirect(route('admin.users'));

        $this->assertDatabaseHas('users', [
            'email' => 'nyadak@layya.org',
            'role' => User::ROLE_ADMIN,
            'is_executive' => true,
            'is_chairman' => false,
            'department_id' => $department->id,
        ]);
    }

    public function test_viewer_cannot_add_users(): void
    {
        $viewer = User::factory()->executive()->create();

        $this->actingAs($viewer)
            ->post(route('admin.users.store'), [
                'name' => 'Blocked User',
                'email' => 'blocked@layya.org',
                'password' => 'Layya2026',
                'role' => User::ROLE_VIEWER,
            ])
            ->assertRedirect(route('admin.dashboard'));

        $this->assertDatabaseMissing('users', ['email' => 'blocked@layya.org']);
    }

    public function test_viewer_cannot_edit_website_content(): void
    {
        $viewer = User::factory()->executive()->create();
        $payload = SiteContentRepository::defaults();
        $payload['hero']['headline'] = 'Should not save';

        $this->actingAs($viewer)
            ->put(route('admin.content.site.update'), $payload)
            ->assertRedirect();

        $this->assertDatabaseMissing('site_contents', ['key' => 'hero']);
    }

    public function test_assigned_admin_cannot_add_users(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.users.store'), [
                'name' => 'Another User',
                'email' => 'another@layya.org',
                'password' => 'Layya2026',
                'role' => User::ROLE_VIEWER,
            ])
            ->assertRedirect(route('admin.dashboard'));

        $this->assertDatabaseMissing('users', ['email' => 'another@layya.org']);
    }

    public function test_viewer_can_open_users_and_content_pages(): void
    {
        $viewer = User::factory()->executive()->create();

        $this->actingAs($viewer)->get(route('admin.users'))->assertOk();
        $this->actingAs($viewer)->get(route('admin.content.site.edit'))->assertOk();
        $this->actingAs($viewer)->get(route('admin.departments.index'))->assertOk();
        $this->actingAs($viewer)->get(route('admin.media.index'))->assertOk();
    }
}
