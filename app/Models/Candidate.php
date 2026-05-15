<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidate extends Model
{
    protected $fillable = [
        'election_id',
        'election_position_id',
        'member_id',
        'manifesto',
        'photo',
        'status',
    ];

    public function election(): BelongsTo
    {
        return $this->belongsTo(Election::class);
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(ElectionPosition::class, 'election_position_id');
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
