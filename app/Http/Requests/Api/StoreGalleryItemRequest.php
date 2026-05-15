<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('create_gallery') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:500'],
            'image_path' => ['required', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'string', 'in:visible,hidden'],
        ];
    }
}
