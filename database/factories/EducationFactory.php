<?php

namespace Database\Factories;

use App\Models\Education;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Education>
 */
class EducationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'institution' => $this->faker->company().' University',
            'program' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'start_date' => $this->faker->dateTimeBetween('-10 years', '-6 years')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('-5 years', '-1 years')->format('Y-m-d'),
            'sort_order' => 0,
        ];
    }
}
