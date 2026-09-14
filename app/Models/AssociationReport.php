<?php

namespace App\Models;

use App\Support\DepartmentalReport;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationReport extends Model
{
    protected $fillable = [
        'title',
        'period',
        'summary',
        'body',
        'status',
        'kind',
        'approval_status',
        'is_public',
        'file_path',
        'file_name',
        'created_by',
        'department_id',
        'approved_by',
        'template',
        'context',
        'deliverables',
        'challenges',
        'attendance',
        'financial_summary',
        'payload',
        'submitted_on',
    ];

    protected $appends = [
        'file_url',
        'print_url',
        'download_url',
        'reference',
        'kind_label',
        'payload_data',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
            'payload' => 'array',
            'submitted_on' => 'date:Y-m-d',
        ];
    }

    public function getFileUrlAttribute(): ?string
    {
        return $this->fileUrl();
    }

    public function getPrintUrlAttribute(): string
    {
        return $this->getKey() ? route('admin.operations.reports.show', $this) : '';
    }

    public function getDownloadUrlAttribute(): string
    {
        return $this->getKey() ? route('admin.operations.reports.download', $this) : '';
    }

    public function getReferenceAttribute(): string
    {
        return sprintf('LAYYA-RPT-%s-%04d', optional($this->created_at)->format('Y') ?: now()->format('Y'), $this->getKey() ?: 0);
    }

    public function getKindLabelAttribute(): string
    {
        return DepartmentalReport::kindLabel($this->template);
    }

    /**
     * @return array<string, mixed>
     */
    public function getPayloadDataAttribute(): array
    {
        return $this->payloadData();
    }

    /**
     * @return array<string, mixed>
     */
    public function payloadData(): array
    {
        return DepartmentalReport::normalize($this->payload);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function fileUrl(): ?string
    {
        return $this->file_path ? '/storage/'.ltrim($this->file_path, '/') : null;
    }
}
