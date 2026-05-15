<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgramParticipantRequest extends FormRequest
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
            'member_id' => ['nullable', 'integer', 'exists:members,id'],
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'gender' => ['nullable', 'string', 'max:20'],
            'age' => ['nullable', 'integer', 'min:0', 'max:150'],
            'role' => ['sometimes', 'string', 'in:participant,trainer,volunteer,guest'],
        ];
    }
}
