<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreCandidateRequest extends FormRequest
{
    public function authorize(): bool
    {
        $u = $this->user();

        return $u && ($u->hasPermission('create_elections') || $u->hasPermission('manage_votes'));
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'election_id' => ['required', 'integer', 'exists:elections,id'],
            'election_position_id' => ['required', 'integer', 'exists:election_positions,id'],
            'member_id' => ['required', 'integer', 'exists:members,id'],
            'manifesto' => ['nullable', 'string'],
            'photo' => ['nullable', 'string', 'max:500'],
        ];
    }
}
