<?php

namespace App\Models;

use App\Support\AssociationMoney;
use App\Support\EventPlanning;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssociationEvent extends Model
{
    protected $fillable = [
        'title',
        'kind',
        'event_date',
        'ends_on',
        'venue',
        'objectives',
        'kpis',
        'audience',
        'total_budget',
        'currency',
        'contingency_percent',
        'program_outline',
        'notes',
        'plan',
        'status',
        'department_id',
        'created_by',
        'ticket_revenue',
        'attendance_count',
    ];

    protected $appends = [
        'reference',
        'kind_label',
        'phase_label',
        'currency_label',
        'budget_subtotal',
        'contingency_amount',
        'grand_total',
        'documents',
        'plan_data',
    ];

    protected function casts(): array
    {
        return [
            'event_date' => 'date:Y-m-d',
            'ends_on' => 'date:Y-m-d',
            'total_budget' => 'decimal:2',
            'contingency_percent' => 'integer',
            'ticket_revenue' => 'decimal:2',
            'attendance_count' => 'integer',
            'plan' => 'array',
        ];
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function budgetItems(): HasMany
    {
        return $this->hasMany(AssociationEventBudgetItem::class, 'event_id');
    }

    public function committee(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'association_event_committee', 'event_id', 'user_id')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(AssociationTask::class, 'event_id');
    }

    /**
     * @return array<string, mixed>
     */
    public function planData(): array
    {
        return array_replace_recursive(EventPlanning::emptyPlan(), $this->plan ?? []);
    }

    public function getReferenceAttribute(): string
    {
        return sprintf('LAYYA-EVT-%s-%04d', optional($this->created_at)->format('Y') ?: now()->format('Y'), $this->getKey() ?: 0);
    }

    public function getKindLabelAttribute(): string
    {
        return EventPlanning::KINDS[$this->kind] ?? 'Event';
    }

    public function getPhaseLabelAttribute(): string
    {
        return EventPlanning::PHASES[$this->status] ?? 'Planning';
    }

    public function getCurrencyLabelAttribute(): string
    {
        return AssociationMoney::currencyLabel($this->currency);
    }

    public function getBudgetSubtotalAttribute(): float
    {
        if ($this->relationLoaded('budgetItems')) {
            return (float) $this->budgetItems->sum(fn (AssociationEventBudgetItem $item) => $item->lineTotal());
        }

        return (float) $this->budgetItems()->get()->sum(fn (AssociationEventBudgetItem $item) => $item->lineTotal());
    }

    public function getContingencyAmountAttribute(): float
    {
        return round($this->budget_subtotal * ((int) ($this->contingency_percent ?: 12) / 100), 2);
    }

    public function getGrandTotalAttribute(): float
    {
        $computed = $this->budget_subtotal + $this->contingency_amount;

        return $computed > 0 ? $computed : (float) $this->total_budget;
    }

    public function getPlanDataAttribute(): array
    {
        return $this->planData();
    }

    /**
     * @return list<array{id: string, label: string, print_url: string, download_url: string}>
     */
    public function getDocumentsAttribute(): array
    {
        if (! $this->getKey()) {
            return [];
        }

        return collect(EventPlanning::DOCUMENTS)->map(fn (string $label, string $id) => [
            'id' => $id,
            'label' => $label,
            'print_url' => route('admin.operations.events.documents.show', [$this, $id]),
            'download_url' => route('admin.operations.events.documents.download', [$this, $id]),
        ])->values()->all();
    }
}
