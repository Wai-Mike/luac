<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class YouthMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'phone',
        'email',
        'county',
        'payam',
        'boma',
        'education_level',
        'current_school',
        'employment_status',
        'skills',
        'interests',
        'heard_about_layya',
        'source',
        'reported_age',
    ];

    protected $appends = ['age'];

    protected $casts = [
        'date_of_birth' => 'date',
        'skills' => 'array',
        'interests' => 'array',
    ];

    public function getAgeAttribute(): ?int
    {
        return $this->date_of_birth?->age ?? $this->reported_age;
    }

    public function scopeCensus($query)
    {
        return $query->where(function ($q) {
            $q->whereNull('source')->orWhere('source', 'census');
        });
    }

    public function isCensusRecord(): bool
    {
        return ($this->source ?? 'census') !== 'membership';
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(YouthMembership::class);
    }

    public function fullName(): string
    {
        return trim($this->first_name.' '.$this->last_name);
    }
}

