<?php

namespace App\Models\Concerns;

use App\Models\Permission;
use App\Models\Role;

trait HasRoles
{
    public function roles(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user')->withTimestamps();
    }

    public function hasRole(string $roleName): bool
    {
        return $this->roles()->where('name', $roleName)->exists();
    }

    /** @param  list<string>  $roleNames */
    public function hasAnyRole(array $roleNames): bool
    {
        return $this->roles()->whereIn('name', $roleNames)->exists();
    }

    public function hasPermission(string $permissionName): bool
    {
        if (method_exists($this, 'isAdmin') && $this->isAdmin()) {
            return true;
        }

        if ($this->hasRole('super_admin')) {
            return true;
        }

        return Permission::query()
            ->where('name', $permissionName)
            ->whereHas('roles', function ($q) {
                $q->whereHas('users', fn ($uq) => $uq->where('users.id', $this->id));
            })
            ->exists();
    }

    public function assignRole(Role|string $role): void
    {
        $id = $role instanceof Role ? $role->id : Role::query()->where('name', $role)->value('id');
        if ($id) {
            $this->roles()->syncWithoutDetaching([$id]);
        }
    }
}
