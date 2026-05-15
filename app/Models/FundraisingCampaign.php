<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FundraisingCampaign extends Model
{
    /** @use HasFactory<\Database\Factories\FundraisingCampaignFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'target_amount',
        'raised_amount',
        'start_date',
        'end_date',
        'status',
        'featured_image',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'target_amount' => 'decimal:2',
            'raised_amount' => 'decimal:2',
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
