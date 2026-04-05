<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed default association and admin accounts.
     */
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'LAYYA Admin',
                'role' => 'admin',
                'password' => bcrypt('Konsonak@github2'),
            ]
        );
        $admin->email_verified_at = now();
        $admin->save();

        $management = User::updateOrCreate(
            ['email' => 'management@gmail.com'],
            [
                'name' => 'Management Demo',
                'role' => 'management',
                'password' => bcrypt('password'),
            ]
        );
        $management->email_verified_at = now();
        $management->save();

        $member = User::updateOrCreate(
            ['email' => 'member@gmail.com'],
            [
                'name' => 'Member Demo',
                'role' => 'member',
                'password' => bcrypt('password'),
            ]
        );
        $member->email_verified_at = now();
        $member->save();
    }
}
