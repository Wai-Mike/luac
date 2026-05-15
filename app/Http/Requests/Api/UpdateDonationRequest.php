<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDonationRequest extends FormRequest
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
            'fundraising_campaign_id' => ['sometimes', 'integer', 'exists:fundraising_campaigns,id'],
            'donor_name' => ['sometimes', 'string', 'max:255'],
            'donor_phone' => ['nullable', 'string', 'max:50'],
            'donor_email' => ['nullable', 'email', 'max:255'],
            'amount' => ['sometimes', 'numeric', 'min:0.01'],
            'payment_method' => ['sometimes', 'string', 'in:cash,bank,mobile_money,other'],
            'reference_no' => ['nullable', 'string', 'max:255'],
            'received_by' => ['nullable', 'integer', 'exists:users,id'],
            'donated_at' => ['sometimes', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
