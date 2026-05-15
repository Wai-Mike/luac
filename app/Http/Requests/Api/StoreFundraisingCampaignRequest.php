<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreFundraisingCampaignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('create_fundraising') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'target_amount' => ['required', 'numeric', 'min:0'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'status' => ['required', 'string', 'in:draft,active,closed'],
            'featured_image' => ['nullable', 'string', 'max:500'],
        ];
    }
}
