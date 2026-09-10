<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationExpense extends Model
{
    public const CATEGORY_MEETINGS = 'meetings_delegations';

    public const CATEGORY_TRANSPORT = 'transport';

    public const CATEGORY_OPERATIONS = 'operations';

    public const CATEGORY_OTHER = 'other';

    /**
     * @return array<string, string>
     */
    public static function categories(): array
    {
        return [
            self::CATEGORY_MEETINGS => 'Meetings & delegations',
            self::CATEGORY_TRANSPORT => 'Transport',
            self::CATEGORY_OPERATIONS => 'Operations',
            self::CATEGORY_OTHER => 'Other',
        ];
    }

    protected $fillable = [
        'department_id',
        'recorded_by',
        'category',
        'title',
        'detail',
        'amount',
        'currency',
        'spent_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'spent_at' => 'date',
        ];
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function recorder(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    public function categoryLabel(): string
    {
        return self::categories()[$this->category] ?? $this->category;
    }
}
