<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\CensusRecord */
class CensusRecordResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'census_survey_id' => $this->census_survey_id,
            'household_code' => $this->household_code,
            'head_of_household_name' => $this->head_of_household_name,
            'gender' => $this->gender,
            'age' => $this->age,
            'phone' => $this->phone,
            'state' => $this->state,
            'county' => $this->county,
            'payam' => $this->payam,
            'boma' => $this->boma,
            'household_size' => $this->household_size,
            'male_count' => $this->male_count,
            'female_count' => $this->female_count,
            'youth_count' => $this->youth_count,
            'children_count' => $this->children_count,
            'elderly_count' => $this->elderly_count,
            'disabled_count' => $this->disabled_count,
            'education_level' => $this->education_level,
            'occupation' => $this->occupation,
            'needs_support' => $this->needs_support,
            'support_needs' => $this->support_needs,
            'collected_by' => $this->collected_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
