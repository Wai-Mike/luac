<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed default association and admin accounts.
     *
     * Expects {@see RoleAndPermissionSeeder} and {@see DefaultDepartmentsSeeder} to have run first (for departments / roles).
     */
    public function run(): void
    {
        $execOfficeId = Department::query()->where('slug', 'executive-office')->value('id');
        $programsId = Department::query()->where('slug', 'programs-welfare')->value('id');

        $layyaAdmin = User::updateOrCreate(
            ['email' => 'admin@layya.org'],
            [
                'name' => 'Super Admin',
                'role' => User::ROLE_ADMIN,
                'password' => Hash::make('password'),
                'status' => 'active',
                'department_id' => $execOfficeId,
            ]
        );
        $layyaAdmin->forceFill(['email_verified_at' => now()])->save();
        $layyaAdmin->assignRole('super_admin');

        $admin = User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Wai Mike',
                'role' => User::ROLE_ADMIN,
                'password' => Hash::make('123'),
                'status' => 'active',
                'department_id' => $execOfficeId,
            ]
        );
        $admin->forceFill(['email_verified_at' => now()])->save();
        $admin->assignRole('super_admin');

        $management = User::updateOrCreate(
            ['email' => 'management@gmail.com'],
            [
                'name' => 'Management Demo',
                'role' => User::ROLE_MANAGEMENT,
                'password' => Hash::make('123'),
                'status' => 'active',
                'department_id' => $programsId,
            ]
        );
        $management->forceFill(['email_verified_at' => now()])->save();

        $member = User::updateOrCreate(
            ['email' => 'member@gmail.com'],
            [
                'name' => 'Member Demo',
                'role' => User::ROLE_MEMBER,
                'password' => Hash::make('123'),
                'status' => 'active',
                'department_id' => null,
            ]
        );
        $member->forceFill(['email_verified_at' => now()])->save();
        $member->assignRole('volunteer');
    }
}
