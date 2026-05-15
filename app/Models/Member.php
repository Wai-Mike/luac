<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Member extends Model
{
    /** @use HasFactory<\Database\Factories\MemberFactory> */
    use HasFactory;

    public const ROLE_MEMBER = 'member';

    public const ROLE_MANAGEMENT = 'management';

    protected $fillable = [
        'member_no',
        'full_name',
        'gender',
        'date_of_birth',
        'phone',
        'email',
        'state',
        'county',
        'payam',
        'boma',
        'current_location',
        'education_level',
        'occupation',
        'membership_type',
        'status',
        'joined_at',
        'photo',
        'notes',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'joined_at' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isManagement(): bool
    {
        return $this->user?->role === self::ROLE_MANAGEMENT;
    }

    public function scopeManagement(Builder $query): Builder
    {
        return $query->whereHas('user', fn (Builder $uq) => $uq->where('role', self::ROLE_MANAGEMENT));
    }

    public function scopeGeneralMembers(Builder $query): Builder
    {
        return $query->where(function (Builder $q) {
            $q->whereNull('user_id')
                ->orWhereHas('user', fn (Builder $uq) => $uq->where('role', self::ROLE_MEMBER));
        });
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $query->when($filters['search'] ?? null, function (Builder $q, string $search) {
            $q->where(function (Builder $inner) use ($search) {
                $inner->where('full_name', 'like', "%{$search}%")
                    ->orWhere('member_no', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        });

        $query->when($filters['gender'] ?? null, fn (Builder $q, $v) => $q->where('gender', $v));
        $query->when($filters['status'] ?? null, fn (Builder $q, $v) => $q->where('status', $v));
        $query->when($filters['county'] ?? null, fn (Builder $q, $v) => $q->where('county', $v));
        $query->when($filters['membership_type'] ?? null, fn (Builder $q, $v) => $q->where('membership_type', $v));

        return $query;
    }
}
