<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFundraisingCampaignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasPermission('update_fundraising') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'target_amount' => ['sometimes', 'numeric', 'min:0'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'status' => ['sometimes', 'string', 'in:draft,active,closed'],
            'featured_image' => ['nullable', 'string', 'max:500'],
        ];
    }
}
