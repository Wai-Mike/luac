<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationTask extends Model
{
    protected $fillable = [
        'title',
        'description',
        'assigned_to',
        'assigned_by',
        'meeting_id',
        'event_id',
        'due_on',
        'priority',
        'is_delegation',
        'department_id',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'due_on' => 'date',
            'is_delegation' => 'boolean',
        ];
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function assigner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function meeting(): BelongsTo
    {
        return $this->belongsTo(AssociationMeeting::class, 'meeting_id');
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(AssociationEvent::class, 'event_id');
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
