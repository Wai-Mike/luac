<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissionDefs = [
            ['view_members', 'View members'],
            ['create_members', 'Create members'],
            ['update_members', 'Update members'],
            ['delete_members', 'Delete members'],
            ['view_staff', 'View staff'],
            ['create_staff', 'Create staff'],
            ['update_staff', 'Update staff'],
            ['delete_staff', 'Delete staff'],
            ['view_programs', 'View programs'],
            ['create_programs', 'Create programs'],
            ['update_programs', 'Update programs'],
            ['delete_programs', 'Delete programs'],
            ['view_fundraising', 'View fundraising'],
            ['create_fundraising', 'Create fundraising'],
            ['update_fundraising', 'Update fundraising'],
            ['delete_fundraising', 'Delete fundraising'],
            ['view_elections', 'View elections'],
            ['create_elections', 'Create elections'],
            ['update_elections', 'Update elections'],
            ['manage_votes', 'Manage votes'],
            ['view_census', 'View census'],
            ['create_census', 'Create census'],
            ['update_census', 'Update census'],
            ['delete_census', 'Delete census'],
            ['view_reports', 'View reports'],
            ['view_news', 'View news'],
            ['create_news', 'Create news'],
            ['update_news', 'Update news'],
            ['delete_news', 'Delete news'],
            ['view_events', 'View events (admin)'],
            ['create_events', 'Create events'],
            ['update_events', 'Update events'],
            ['delete_events', 'Delete events'],
            ['view_gallery', 'View gallery (admin)'],
            ['create_gallery', 'Create gallery items'],
            ['update_gallery', 'Update gallery items'],
            ['delete_gallery', 'Delete gallery items'],
            ['view_contact_messages', 'View contact messages'],
            ['update_contact_messages', 'Update contact messages'],
            ['view_dashboard', 'View admin dashboard'],
            ['manage_departments', 'Manage departments'],
        ];

        foreach ($permissionDefs as [$name, $display]) {
            Permission::query()->firstOrCreate(
                ['name' => $name],
                ['display_name' => $display, 'description' => null]
            );
        }

        $roles = [
            'super_admin' => 'Super Admin',
            'admin' => 'Administrator',
            'staff' => 'Staff',
            'election_officer' => 'Election Officer',
            'census_enumerator' => 'Census Enumerator',
            'finance_officer' => 'Finance Officer',
            'volunteer' => 'Volunteer',
            'viewer' => 'Viewer',
        ];

        foreach ($roles as $name => $display) {
            Role::query()->firstOrCreate(
                ['name' => $name],
                ['display_name' => $display, 'description' => null]
            );
        }

        $allPermissionIds = Permission::query()->pluck('id');

        Role::query()->where('name', 'super_admin')->first()?->permissions()->sync($allPermissionIds);
        Role::query()->where('name', 'admin')->first()?->permissions()->sync($allPermissionIds);

        $sync = fn (string $roleName, array $names) => Role::query()
            ->where('name', $roleName)
            ->first()
            ?->permissions()
            ->sync(Permission::query()->whereIn('name', $names)->pluck('id'));

        $sync('staff', [
            'view_dashboard',
            'view_members', 'create_members', 'update_members',
            'view_staff', 'view_programs', 'create_programs', 'update_programs',
            'view_fundraising', 'view_reports',
            'view_news', 'create_news', 'update_news',
            'view_events', 'create_events', 'update_events',
            'view_gallery', 'create_gallery', 'update_gallery',
            'view_contact_messages', 'update_contact_messages',
        ]);

        $sync('finance_officer', [
            'view_dashboard',
            'view_fundraising', 'create_fundraising', 'update_fundraising', 'delete_fundraising', 'view_reports',
        ]);

        $sync('election_officer', [
            'view_dashboard',
            'view_elections', 'create_elections', 'update_elections', 'manage_votes',
        ]);

        $sync('census_enumerator', [
            'view_dashboard',
            'view_census', 'create_census', 'update_census',
        ]);

        $sync('viewer', [
            'view_dashboard',
            'view_members', 'view_programs', 'view_fundraising', 'view_elections', 'view_census', 'view_reports', 'view_staff',
            'view_news', 'view_events', 'view_gallery', 'view_contact_messages',
        ]);

        $sync('volunteer', [
            'view_members', 'view_programs', 'view_census',
        ]);

        foreach (Role::query()->cursor() as $role) {
            if (filled($role->slug)) {
                continue;
            }

            $base = trim(Str::slug((string) $role->name), '-');
            if ($base === '') {
                $base = 'role';
            }

            $role->forceFill([
                'slug' => $base.'-'.$role->getKey(),
            ])->save();
        }
    }
}
