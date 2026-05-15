<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Voter */
class VoterResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'election_id' => $this->election_id,
            'member_id' => $this->member_id,
            'is_verified' => $this->is_verified,
            'has_voted' => $this->has_voted,
            'verified_by' => $this->verified_by,
            'voted_at' => $this->voted_at?->toIso8601String(),
            'member' => $this->whenLoaded('member', fn () => new MemberResource($this->member)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
