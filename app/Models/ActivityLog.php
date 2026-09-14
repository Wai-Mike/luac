<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Facades\Schema;

class ActivityLog extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'action',
        'description',
        'subject_type',
        'subject_id',
        'properties',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'properties' => 'array',
        ];
    }

    /** @return BelongsTo<User, ActivityLog> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return MorphTo<Model, ActivityLog> */
    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @param  array<string, mixed>  $properties
     */
    public static function record(string $action, string $description, ?Model $subject = null, array $properties = []): self
    {
        if (! Schema::hasTable('activity_logs')) {
            return new self();
        }

        return self::query()->create([
            'user_id' => auth()->id(),
            'action' => $action,
            'description' => $description,
            'subject_type' => $subject ? $subject::class : null,
            'subject_id' => $subject?->getKey(),
            'properties' => $properties === [] ? null : $properties,
        ]);
    }

    public function kindLabel(): string
    {
        return match (true) {
            str_starts_with((string) $this->action, 'census') => 'Census',
            str_starts_with((string) $this->action, 'membership') => 'Membership',
            str_starts_with((string) $this->action, 'contact') => 'Feedback',
            str_starts_with((string) $this->action, 'donation') => 'Donation',
            str_starts_with((string) $this->action, 'department') => 'Department',
            str_starts_with((string) $this->action, 'ledger') => 'Ledger',
            str_starts_with((string) $this->action, 'requisition') => 'Procurement',
            default => 'Activity',
        };
    }
}
