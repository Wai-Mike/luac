<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseRequest extends Model
{
    public const STATUS_SUBMITTED = 'submitted';

    public const STATUS_REVIEWED = 'reviewed';

    public const STATUS_APPROVED = 'approved';

    public const STATUS_PAID = 'paid';

    public const STATUS_REJECTED = 'rejected';

    protected $fillable = [
        'title',
        'purpose',
        'amount',
        'currency',
        'payment_method',
        'status',
        'department_id',
        'requested_by',
        'reviewed_by',
        'approved_by',
        'paid_by',
        'reviewed_at',
        'approved_at',
        'paid_at',
        'review_notes',
        'budget_hold',
        'hold_reason',
        'event_id',
    ];

    protected $appends = [
        'reference',
        'print_url',
        'download_url',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'budget_hold' => 'boolean',
            'reviewed_at' => 'datetime',
            'approved_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    public function getReferenceAttribute(): string
    {
        return sprintf('LAYYA-PRO-%s-%04d', optional($this->created_at)->format('Y') ?: now()->format('Y'), $this->getKey() ?: 0);
    }

    public function getPrintUrlAttribute(): string
    {
        return route('admin.operations.purchase-requests.show', $this);
    }

    public function getDownloadUrlAttribute(): string
    {
        return route('admin.operations.purchase-requests.download', $this);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function payer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'paid_by');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(AssociationEvent::class, 'event_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PurchaseRequestItem::class);
    }

    public function receipts(): HasMany
    {
        return $this->hasMany(AssociationReceipt::class);
    }
}
