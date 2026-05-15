<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('create_members') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:20'],
            'date_of_birth' => ['nullable', 'date'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'state' => ['nullable', 'string', 'max:100'],
            'county' => ['nullable', 'string', 'max:100'],
            'payam' => ['nullable', 'string', 'max:100'],
            'boma' => ['nullable', 'string', 'max:100'],
            'current_location' => ['nullable', 'string', 'max:255'],
            'education_level' => ['nullable', 'string', 'max:100'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'membership_type' => ['required', 'string', 'in:youth,adult,honorary,volunteer'],
            'status' => ['required', 'string', 'in:active,inactive,suspended,deceased'],
            'joined_at' => ['nullable', 'date'],
            'photo' => ['nullable', 'string', 'max:500'],
            'notes' => ['nullable', 'string'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
