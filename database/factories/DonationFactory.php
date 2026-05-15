<?php

namespace Database\Factories;

use App\Models\Donation;
use App\Models\FundraisingCampaign;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Donation>
 */
class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition(): array
    {
        return [
            'fundraising_campaign_id' => FundraisingCampaign::factory(),
            'donor_name' => $this->faker->name(),
            'amount' => 50,
            'payment_method' => 'cash',
            'donated_at' => now(),
            'received_by' => User::factory(),
        ];
    }
}
