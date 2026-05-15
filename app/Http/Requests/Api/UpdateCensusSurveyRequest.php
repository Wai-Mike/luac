<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCensusSurveyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_census') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'year' => ['sometimes', 'integer', 'min:2000', 'max:2100'],
            'start_date' => ['sometimes', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'status' => ['sometimes', 'string', 'in:draft,active,closed'],
        ];
    }
}
