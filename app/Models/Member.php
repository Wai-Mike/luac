<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Member extends Model
{
    public const ROLE_MEMBER = 'member';

    public const ROLE_MANAGEMENT = 'management';

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'profile_image',
        'county',
        'payam',
        'boma',
        'department',
        'department_role',
    ];

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
}
