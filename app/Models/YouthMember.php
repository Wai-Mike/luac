<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YouthMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'phone',
        'email',
        'county',
        'payam',
        'boma',
        'education_level',
        'current_school',
        'employment_status',
        'skills',
        'interests',
        'heard_about_layya',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'skills' => 'array',
        'interests' => 'array',
    ];
}

