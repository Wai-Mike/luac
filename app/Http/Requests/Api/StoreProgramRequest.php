<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('create_programs') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'category' => ['required', 'string', 'in:youth_empowerment,gender_equality,community_support,sports,education,digital_innovation,fundraising,mentorship'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'string', 'in:planned,ongoing,completed,cancelled'],
            'featured_image' => ['nullable', 'string', 'max:500'],
        ];
    }
}
