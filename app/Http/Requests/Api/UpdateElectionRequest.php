<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateElectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_elections') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'election_date' => ['sometimes', 'date'],
            'status' => ['sometimes', 'string', 'in:draft,open,closed,published'],
        ];
    }
}
