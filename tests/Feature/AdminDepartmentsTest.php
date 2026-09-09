<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminDepartmentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_executive_can_view_departments(): void
    {
        Department::factory()->create([
            'name' => 'Executive Office',
            'slug' => 'executive-office',
            'status' => 'active',
        ]);

        $this->actingAs(User::factory()->executive()->create())
            ->get(route('admin.departments.index'))
            ->assertOk();
    }
}
