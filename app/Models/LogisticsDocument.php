<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogisticsDocument extends Model
{
    public const KINDS = [
        'lpo' => 'Local purchase order',
        'purchase_request' => 'Purchase request order',
        'quotation' => 'Quotation',
        'invoice' => 'Invoice',
        'delivery_note' => 'Delivery note',
        'goods_received' => 'Goods received note',
        'waybill' => 'Waybill',
        'mou' => 'Memorandum of understanding',
        'agreement' => 'Agreement / contract',
        'partner_register' => 'Partner / donor register',
        'other' => 'Other logistics document',
    ];

    public const KIND_CODES = [
        'lpo' => 'LPO',
        'purchase_request' => 'PRO',
        'quotation' => 'QTN',
        'invoice' => 'INV',
        'delivery_note' => 'DN',
        'goods_received' => 'GRN',
        'waybill' => 'WB',
        'mou' => 'MOU',
        'agreement' => 'AGR',
        'partner_register' => 'PTR',
        'other' => 'DOC',
    ];

    protected $fillable = [
        'title',
        'kind',
        'reference_no',
        'document_date',
        'vendor',
        'party_from',
        'party_to',
        'amount',
        'currency',
        'items',
        'details',
        'notes',
        'file_path',
        'file_name',
        'department_id',
        'purchase_request_id',
        'uploaded_by',
    ];

    protected $appends = [
        'kind_label',
        'file_url',
        'print_url',
        'download_url',
        'reference',
    ];

    protected function casts(): array
    {
        return [
            'document_date' => 'date',
            'amount' => 'decimal:2',
            'items' => 'array',
            'details' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::created(function (self $document): void {
            if (filled($document->reference_no)) {
                return;
            }

            $document->updateQuietly([
                'reference_no' => $document->makeReference(),
            ]);
        });
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function purchaseRequest(): BelongsTo
    {
        return $this->belongsTo(PurchaseRequest::class);
    }

    public function getKindLabelAttribute(): string
    {
        return self::KINDS[$this->kind] ?? 'Logistics document';
    }

    public function getFileUrlAttribute(): ?string
    {
        return $this->file_path ? '/storage/'.ltrim($this->file_path, '/') : null;
    }

    public function getPrintUrlAttribute(): string
    {
        return route('admin.operations.logistics.show', $this);
    }

    public function getDownloadUrlAttribute(): string
    {
        return route('admin.operations.logistics.download', $this);
    }

    public function getReferenceAttribute(): string
    {
        return $this->reference_no ?: $this->makeReference();
    }

    public function makeReference(): string
    {
        $code = self::KIND_CODES[$this->kind] ?? 'DOC';

        return sprintf('LAYYA-%s-%s-%04d', $code, now()->format('Y'), $this->getKey() ?: 0);
    }

    /**
     * @return list<array{description: string, quantity: int|float, unit: string, unit_cost: float}>
     */
    public function lineItems(): array
    {
        return collect($this->items ?? [])->filter(fn ($item) => filled($item['description'] ?? null))->map(fn ($item) => [
            'description' => (string) $item['description'],
            'quantity' => (float) ($item['quantity'] ?? 1),
            'unit' => (string) ($item['unit'] ?? 'unit'),
            'unit_cost' => (float) ($item['unit_cost'] ?? 0),
        ])->values()->all();
    }
}
