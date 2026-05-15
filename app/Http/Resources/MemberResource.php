<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Member */
class MemberResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'member_no' => $this->member_no,
            'full_name' => $this->full_name,
            'gender' => $this->gender,
            'date_of_birth' => $this->date_of_birth?->format('Y-m-d'),
            'phone' => $this->phone,
            'email' => $this->email,
            'state' => $this->state,
            'county' => $this->county,
            'payam' => $this->payam,
            'boma' => $this->boma,
            'current_location' => $this->current_location,
            'education_level' => $this->education_level,
            'occupation' => $this->occupation,
            'membership_type' => $this->membership_type,
            'status' => $this->status,
            'joined_at' => $this->joined_at?->format('Y-m-d'),
            'photo' => $this->photo,
            'notes' => $this->notes,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
