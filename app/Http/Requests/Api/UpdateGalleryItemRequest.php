<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_gallery') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:500'],
            'image_path' => ['sometimes', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['sometimes', 'string', 'in:visible,hidden'],
        ];
    }
}
