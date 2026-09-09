<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $this->actingAs(User::factory()->executive()->create());

        $this->get('/dashboard')->assertOk();
    }

    public function test_non_executives_are_sent_home_from_the_dashboard()
    {
        $this->actingAs(User::factory()->create(['is_executive' => false, 'role' => 'member']));

        $this->get('/dashboard')->assertRedirect('/');
    }
}
