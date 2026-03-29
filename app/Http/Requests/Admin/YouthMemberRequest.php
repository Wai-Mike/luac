<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class YouthMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Admin middleware already protects these routes
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'gender' => ['nullable', 'in:male,female,other'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'county' => ['nullable', 'string', 'max:150'],
            'payam' => ['nullable', 'string', 'max:150'],
            'boma' => ['nullable', 'string', 'max:150'],
            'education_level' => ['nullable', 'string', 'max:150'],
            'current_school' => ['nullable', 'string', 'max:255'],
            'employment_status' => ['nullable', 'string', 'max:150'],
            'skills' => ['nullable', 'array'],
            'skills.*' => ['string', 'max:150'],
            'interests' => ['nullable', 'array'],
            'interests.*' => ['string', 'max:150'],
            'heard_about_layya' => ['nullable', 'string', 'max:255'],
        ];
    }
}

