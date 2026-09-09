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

        $executives = [
            ['email' => 'chairman@layya.org', 'name' => 'Eng. Wai Michael Kat', 'password' => 'Layya2026', 'role' => User::ROLE_ADMIN, 'chairman' => true],
            ['email' => 'admin@gmail.com', 'name' => 'Eng. Wai Michael Kat', 'password' => '123', 'role' => User::ROLE_ADMIN, 'chairman' => true],
            ['email' => 'admin@layya.org', 'name' => 'Assigned Admin', 'password' => 'password', 'role' => User::ROLE_ADMIN, 'chairman' => false],
            ['email' => 'sg@layya.org', 'name' => 'Mr. Jok Wuor Miyen', 'password' => 'Layya2026', 'role' => User::ROLE_VIEWER, 'chairman' => false],
            ['email' => 'speaker@layya.org', 'name' => 'Counsel Chol Gach Abiel', 'password' => 'Layya2026', 'role' => User::ROLE_VIEWER, 'chairman' => false],
        ];

        foreach ($executives as $row) {
            $user = User::updateOrCreate(
                ['email' => $row['email']],
                [
                    'name' => $row['name'],
                    'role' => $row['role'],
                    'is_executive' => true,
                    'is_chairman' => $row['chairman'],
                    'password' => Hash::make($row['password']),
                    'status' => 'active',
                    'department_id' => $execOfficeId,
                ]
            );
            $user->forceFill(['email_verified_at' => now()])->save();
            $user->assignRole('executive');
            if ($row['chairman']) {
                $user->assignRole('super_admin');
            } elseif ($row['role'] === User::ROLE_ADMIN) {
                $user->assignRole('admin');
            }
        }

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
