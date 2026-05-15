<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CastVoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'election_id' => ['required', 'integer', 'exists:elections,id'],
            'election_position_id' => ['required', 'integer', 'exists:election_positions,id'],
            'candidate_id' => ['required', 'integer', 'exists:candidates,id'],
        ];
    }
}
