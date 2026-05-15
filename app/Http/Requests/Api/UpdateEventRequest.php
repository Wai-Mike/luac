<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_events') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'starts_at' => ['sometimes', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'event_date' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'status' => ['sometimes', 'string', 'in:upcoming,completed,cancelled'],
        ];
    }
}
