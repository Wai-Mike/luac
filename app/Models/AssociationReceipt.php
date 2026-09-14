<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationReceipt extends Model
{
    protected $fillable = [
        'title',
        'vendor',
        'amount',
        'currency',
        'payment_method',
        'notes',
        'file_path',
        'file_name',
        'purchase_request_id',
        'department_id',
        'recorded_by',
        'received_on',
    ];

    protected $appends = [
        'reference',
        'file_url',
        'print_url',
        'download_url',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'received_on' => 'date',
        ];
    }

    public function purchaseRequest(): BelongsTo
    {
        return $this->belongsTo(PurchaseRequest::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function getReferenceAttribute(): string
    {
        return sprintf('LAYYA-RCT-%s-%04d', optional($this->created_at)->format('Y') ?: now()->format('Y'), $this->getKey() ?: 0);
    }

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? '/storage/'.ltrim($this->file_path, '/') : null;
    }

    public function getPrintUrlAttribute(): string
    {
        return route('admin.operations.receipts.show', $this);
    }

    public function getDownloadUrlAttribute(): string
    {
        return route('admin.operations.receipts.download', $this);
    }
}
