<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonationRequest extends FormRequest
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
            'fundraising_campaign_id' => ['required', 'integer', 'exists:fundraising_campaigns,id'],
            'donor_name' => ['required', 'string', 'max:255'],
            'donor_phone' => ['nullable', 'string', 'max:50'],
            'donor_email' => ['nullable', 'email', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'payment_method' => ['required', 'string', 'in:cash,bank,mobile_money,other'],
            'reference_no' => ['nullable', 'string', 'max:255'],
            'received_by' => ['nullable', 'integer', 'exists:users,id'],
            'donated_at' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
