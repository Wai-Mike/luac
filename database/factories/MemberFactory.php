<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Member>
 */
class MemberFactory extends Factory
{
    protected $model = Member::class;

    public function definition(): array
    {
        return [
            'member_no' => 'LAYYA-TEST-'.$this->faker->unique()->numerify('######'),
            'full_name' => $this->faker->name(),
            'gender' => 'male',
            'membership_type' => 'youth',
            'status' => 'active',
        ];
    }
}
