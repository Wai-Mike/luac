<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNewsPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_news') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['sometimes', 'string'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'status' => ['sometimes', 'string', 'in:draft,published'],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
