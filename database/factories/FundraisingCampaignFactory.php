<?php

namespace Database\Factories;

use App\Models\FundraisingCampaign;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<FundraisingCampaign>
 */
class FundraisingCampaignFactory extends Factory
{
    protected $model = FundraisingCampaign::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.$this->faker->unique()->numerify('###'),
            'description' => $this->faker->paragraph(),
            'target_amount' => 10000,
            'raised_amount' => 0,
            'status' => 'active',
            'created_by' => User::factory(),
        ];
    }
}
