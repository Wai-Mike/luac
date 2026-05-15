<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreElectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('create_elections') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'election_date' => ['required', 'date'],
            'status' => ['required', 'string', 'in:draft,open,closed,published'],
        ];
    }
}
