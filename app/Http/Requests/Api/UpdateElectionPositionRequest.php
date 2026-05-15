<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateElectionPositionRequest extends FormRequest
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
            'max_winners' => ['nullable', 'integer', 'min:1', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
