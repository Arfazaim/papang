<?php

namespace Database\Factories;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization' => $this->faker->company(),
            'position' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'start_date' => $this->faker->dateTimeBetween('-5 years', '-2 years')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('-1 years', 'now')->format('Y-m-d'),
            'sort_order' => 0,
        ];
    }
}
