<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Donation */
class DonationResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fundraising_campaign_id' => $this->fundraising_campaign_id,
            'donor_name' => $this->donor_name,
            'donor_phone' => $this->donor_phone,
            'donor_email' => $this->donor_email,
            'amount' => (string) $this->amount,
            'payment_method' => $this->payment_method,
            'reference_no' => $this->reference_no,
            'received_by' => $this->received_by,
            'donated_at' => $this->donated_at?->toIso8601String(),
            'notes' => $this->notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
