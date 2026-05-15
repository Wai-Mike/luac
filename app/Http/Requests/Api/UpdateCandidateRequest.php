<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCandidateRequest extends FormRequest
{
    public function authorize(): bool
    {
        $u = $this->user();

        return $u && ($u->hasPermission('manage_votes') || $u->hasPermission('update_elections'));
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'manifesto' => ['nullable', 'string'],
            'photo' => ['nullable', 'string', 'max:500'],
            'status' => ['sometimes', 'string', 'in:pending,approved,rejected,withdrawn'],
        ];
    }
}
