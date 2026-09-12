<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'slug' => $this->faker->unique()->slug(),
            'short_description' => $this->faker->text(100),
            'full_description' => $this->faker->paragraphs(3, true),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'is_featured' => $this->faker->boolean(20),
            'started_at' => $this->faker->dateTimeBetween('-2 years', '-1 year')->format('Y-m-d'),
            'completed_at' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'sort_order' => 0,
        ];
    }
}
