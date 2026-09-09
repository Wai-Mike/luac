<?php

namespace App\Models;

use App\Support\FundraisingPrograms;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    /** @use HasFactory<\Database\Factories\DonationFactory> */
    use HasFactory;

    protected $fillable = [
        'fundraising_campaign_id',
        'donor_name',
        'donor_phone',
        'donor_email',
        'amount',
        'currency',
        'amount_usd',
        'payment_method',
        'reference_no',
        'received_by',
        'donated_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'amount_usd' => 'decimal:2',
            'donated_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Donation $donation): void {
            $currency = in_array($donation->currency, ['usd', 'ssp'], true) ? $donation->currency : 'usd';
            $donation->currency = $currency;
            $donation->amount_usd = FundraisingPrograms::toUsd((float) $donation->amount, $currency);
        });
    }

    public function campaign(): BelongsTo
    {
        return $this->belongsTo(FundraisingCampaign::class, 'fundraising_campaign_id');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'received_by');
    }
}
