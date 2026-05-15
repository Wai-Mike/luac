<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voter extends Model
{
    protected $fillable = [
        'election_id',
        'member_id',
        'is_verified',
        'has_voted',
        'verified_by',
        'voted_at',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'has_voted' => 'boolean',
            'voted_at' => 'datetime',
        ];
    }

    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
