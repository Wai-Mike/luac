<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Candidate */
class CandidateResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'election_id' => $this->election_id,
            'election_position_id' => $this->election_position_id,
            'member_id' => $this->member_id,
            'manifesto' => $this->manifesto,
            'photo' => $this->photo,
            'status' => $this->status,
            'member' => $this->whenLoaded('member', fn () => new MemberResource($this->member)),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
