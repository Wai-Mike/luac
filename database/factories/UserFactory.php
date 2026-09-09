<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'role' => 'member',
            'is_executive' => false,
            'is_chairman' => false,
            'status' => 'active',
            'google_id' => null,
            'avatar' => null,
        ];
    }

    /**
     * Indicate that the user is an admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'is_executive' => true,
            'is_chairman' => false,
        ]);
    }

    public function executive(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'viewer',
            'is_executive' => true,
            'is_chairman' => false,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);
    }

    public function chairman(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'is_executive' => true,
            'is_chairman' => true,
            'status' => 'active',
            'email_verified_at' => now(),
        ]);
    }
}
