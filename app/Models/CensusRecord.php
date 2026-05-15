<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CensusRecord extends Model
{
    protected $fillable = [
        'census_survey_id',
        'household_code',
        'head_of_household_name',
        'gender',
        'age',
        'phone',
        'state',
        'county',
        'payam',
        'boma',
        'household_size',
        'male_count',
        'female_count',
        'youth_count',
        'children_count',
        'elderly_count',
        'disabled_count',
        'education_level',
        'occupation',
        'needs_support',
        'support_needs',
        'collected_by',
    ];

    protected function casts(): array
    {
        return [
            'needs_support' => 'boolean',
        ];
    }

    public function survey(): BelongsTo
    {
        return $this->belongsTo(CensusSurvey::class, 'census_survey_id');
    }

    public function collector(): BelongsTo
    {
        return $this->belongsTo(User::class, 'collected_by');
    }

    public function scopeFilter(Builder $query, array $filters): Builder
    {
        $query->when($filters['search'] ?? null, function (Builder $q, string $search) {
            $q->where(function (Builder $inner) use ($search) {
                $inner->where('head_of_household_name', 'like', "%{$search}%")
                    ->orWhere('household_code', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        });

        $query->when($filters['county'] ?? null, fn (Builder $q, $v) => $q->where('county', $v));
        $query->when($filters['gender'] ?? null, fn (Builder $q, $v) => $q->where('gender', $v));
        $query->when(
            array_key_exists('needs_support', $filters) && $filters['needs_support'] !== null && $filters['needs_support'] !== '',
            fn (Builder $q) => $q->where('needs_support', filter_var($filters['needs_support'], FILTER_VALIDATE_BOOLEAN))
        );

        return $query;
    }
}
