<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LedgerJournal extends Model
{
    protected $fillable = [
        'reference',
        'posted_on',
        'memo',
        'source_type',
        'source_id',
        'currency',
        'posted_by',
    ];

    protected function casts(): array
    {
        return [
            'posted_on' => 'date',
        ];
    }

    public function lines(): HasMany
    {
        return $this->hasMany(LedgerLine::class, 'journal_id');
    }

    public function poster(): BelongsTo
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    public function source(): MorphTo
    {
        return $this->morphTo();
    }
}
