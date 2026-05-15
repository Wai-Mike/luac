<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Staff extends Model
{
    protected $table = 'staff';

    protected $fillable = [
        'user_id',
        'full_name',
        'position',
        'phone',
        'email',
        'gender',
        'photo',
        'bio',
        'status',
        'sort_order',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
