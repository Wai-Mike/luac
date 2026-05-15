<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_programs') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'category' => ['sometimes', 'string', 'in:youth_empowerment,gender_equality,community_support,sports,education,digital_innovation,fundraising,mentorship'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'status' => ['sometimes', 'string', 'in:planned,ongoing,completed,cancelled'],
            'featured_image' => ['nullable', 'string', 'max:500'],
        ];
    }
}
