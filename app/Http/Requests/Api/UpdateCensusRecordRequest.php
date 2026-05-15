<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCensusRecordRequest extends FormRequest
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
            'household_code' => ['nullable', 'string', 'max:100'],
            'head_of_household_name' => ['sometimes', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:20'],
            'age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'phone' => ['nullable', 'string', 'max:50'],
            'state' => ['nullable', 'string', 'max:100'],
            'county' => ['nullable', 'string', 'max:100'],
            'payam' => ['nullable', 'string', 'max:100'],
            'boma' => ['nullable', 'string', 'max:100'],
            'household_size' => ['nullable', 'integer', 'min:1'],
            'male_count' => ['nullable', 'integer', 'min:0'],
            'female_count' => ['nullable', 'integer', 'min:0'],
            'youth_count' => ['nullable', 'integer', 'min:0'],
            'children_count' => ['nullable', 'integer', 'min:0'],
            'elderly_count' => ['nullable', 'integer', 'min:0'],
            'disabled_count' => ['nullable', 'integer', 'min:0'],
            'education_level' => ['nullable', 'string', 'max:100'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'needs_support' => ['nullable', 'boolean'],
            'support_needs' => ['nullable', 'string'],
        ];
    }
}
