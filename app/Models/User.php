<?php

namespace App\Models;

use App\Models\Concerns\HasRoles;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable;

    public const ROLE_MEMBER = 'member';

    public const ROLE_MANAGEMENT = 'management';

    public const ROLE_ADMIN = 'admin';

    public const ROLE_VIEWER = 'viewer';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_executive',
        'is_chairman',
        'department_id',
        'phone',
        'status',
        'last_login_at',
        'google_id',
        'avatar',
    ];

    /**
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_login_at' => 'datetime',
            'is_executive' => 'boolean',
            'is_chairman' => 'boolean',
        ];
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    /** @return BelongsTo<Department, User> */
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function member(): HasOne
    {
        return $this->hasOne(Member::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isChairman(): bool
    {
        return (bool) $this->is_chairman;
    }

    public function canManageUsers(): bool
    {
        return $this->isChairman();
    }

    public function canEditContent(): bool
    {
        return $this->isChairman() || $this->isAdmin();
    }

    public function isAssociationManagement(): bool
    {
        return $this->role === self::ROLE_MANAGEMENT;
    }

    public function isAssociationMember(): bool
    {
        return $this->role === self::ROLE_MEMBER;
    }

    public function isExecutive(): bool
    {
        return $this->is_executive
            || $this->isAdmin()
            || $this->hasRole('executive')
            || $this->hasRole('super_admin');
    }

    public function canAccessAdminPanel(): bool
    {
        return $this->isExecutive();
    }

    /** @return list<string> */
    public function permissionNames(): array
    {
        if ($this->isChairman()) {
            return Permission::query()->orderBy('name')->pluck('name')->all();
        }

        if ($this->canEditContent()) {
            return Permission::query()
                ->whereNotIn('name', ['manage_users', 'manage_departments'])
                ->orderBy('name')
                ->pluck('name')
                ->all();
        }

        if ($this->isExecutive()) {
            return Permission::query()
                ->where(fn ($q) => $q->where('name', 'like', 'view_%')->orWhere('name', 'view_dashboard'))
                ->orderBy('name')
                ->pluck('name')
                ->all();
        }

        return Permission::query()
            ->whereHas('roles', function ($q) {
                $q->whereHas('users', fn ($uq) => $uq->whereKey($this->getKey()));
            })
            ->orderBy('name')
            ->pluck('name')
            ->unique()
            ->values()
            ->all();
    }
}
