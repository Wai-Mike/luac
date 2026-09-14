<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationEventBudgetItem extends Model
{
    protected $fillable = [
        'event_id',
        'category',
        'elements',
        'unit_metric',
        'quantity',
        'unit_cost',
        'amount',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:2',
            'unit_cost' => 'decimal:2',
            'amount' => 'decimal:2',
        ];
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(AssociationEvent::class, 'event_id');
    }

    public function lineTotal(): float
    {
        if ($this->amount !== null && (float) $this->amount > 0) {
            return (float) $this->amount;
        }

        return ((float) ($this->quantity ?: 0)) * ((float) ($this->unit_cost ?: 0));
    }
}
