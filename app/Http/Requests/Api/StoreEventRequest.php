<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('create_events') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'event_date' => ['nullable', 'date'],
            'location' => ['nullable', 'string', 'max:255'],
            'featured_image' => ['nullable', 'string', 'max:500'],
            'status' => ['required', 'string', 'in:upcoming,completed,cancelled'],
        ];
    }
}
