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

    public const OFFICE_CHAIRMAN = 'chairman';

    public const OFFICE_DEPUTY_CHAIRMAN = 'deputy_chairman';

    public const OFFICE_SECRETARY_GENERAL = 'secretary_general';

    public const OFFICE_DEPUTY_SG = 'deputy_secretary_general';

    public const OFFICE_FINANCE = 'finance';

    public const AMS_ROLE_EXECUTIVE = 'executive';

    public const AMS_ROLE_FINANCE = 'finance';

    public const AMS_ROLE_SECRETARIAT = 'secretariat';

    public const AMS_ROLE_DEPARTMENT = 'department_secretary';

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
        'office',
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
        return (bool) $this->is_chairman || $this->office === self::OFFICE_CHAIRMAN;
    }

    public function resolvedOffice(): string
    {
        if ($this->is_chairman) {
            return self::OFFICE_CHAIRMAN;
        }

        if (filled($this->office)) {
            return (string) $this->office;
        }

        $slug = strtolower((string) $this->department?->slug);
        if (str_contains($slug, 'finance')) {
            return self::OFFICE_FINANCE;
        }

        return '';
    }

    public function isDeputyChairman(): bool
    {
        return $this->resolvedOffice() === self::OFFICE_DEPUTY_CHAIRMAN;
    }

    public function isSecretaryGeneral(): bool
    {
        return in_array($this->resolvedOffice(), [self::OFFICE_SECRETARY_GENERAL, self::OFFICE_DEPUTY_SG], true);
    }

    public function isFinanceOfficer(): bool
    {
        return $this->resolvedOffice() === self::OFFICE_FINANCE;
    }

    public function canReviewPurchaseOrders(): bool
    {
        return $this->isChairman() || $this->isSecretaryGeneral();
    }

    public function canApprovePurchaseOrders(): bool
    {
        return $this->isChairman() || $this->isDeputyChairman();
    }

    public function canReleasePayment(): bool
    {
        return $this->isChairman() || $this->isFinanceOfficer();
    }

    public function canPublishPublicReports(): bool
    {
        return $this->isChairman() || $this->isDeputyChairman();
    }

    public function canManageUsers(): bool
    {
        return $this->isChairman();
    }

    public function amsRole(): string
    {
        if ($this->isFinanceOfficer()) {
            return self::AMS_ROLE_FINANCE;
        }

        if ($this->isSecretaryGeneral()) {
            return self::AMS_ROLE_SECRETARIAT;
        }

        if ($this->isChairman() || $this->isDeputyChairman() || $this->isAdmin()) {
            return self::AMS_ROLE_EXECUTIVE;
        }

        if ($this->department_id) {
            return self::AMS_ROLE_DEPARTMENT;
        }

        return self::AMS_ROLE_EXECUTIVE;
    }

    public function amsRoleLabel(): string
    {
        return match ($this->amsRole()) {
            self::AMS_ROLE_FINANCE => 'Finance Officer / Treasurer',
            self::AMS_ROLE_SECRETARIAT => 'Secretariat',
            self::AMS_ROLE_DEPARTMENT => 'Department Secretary',
            default => 'Executive Leadership',
        };
    }

    public function canManageBudgets(): bool
    {
        return $this->isChairman() || $this->isDeputyChairman() || $this->isFinanceOfficer() || $this->isAdmin();
    }

    public function canReleaseBudgetHold(): bool
    {
        return $this->canManageBudgets();
    }

    public function canViewAssociationLedger(): bool
    {
        return $this->isChairman()
            || $this->isDeputyChairman()
            || $this->isFinanceOfficer()
            || $this->isSecretaryGeneral()
            || $this->isAdmin();
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
