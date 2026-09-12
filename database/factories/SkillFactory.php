<?php

namespace Database\Factories;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'level' => $this->faker->randomElement(['Beginner', 'Intermediate', 'Advanced']),
            'description' => $this->faker->sentence(),
            'is_featured' => $this->faker->boolean(30),
            'sort_order' => 0,
        ];
    }
}
