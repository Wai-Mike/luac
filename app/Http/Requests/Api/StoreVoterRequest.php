<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoterRequest extends FormRequest
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
            'member_id' => ['required', 'integer', 'exists:members,id'],
        ];
    }
}
