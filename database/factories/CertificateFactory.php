<?php

namespace Database\Factories;

use App\Models\Certificate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Certificate>
 */
class CertificateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'issuer' => $this->faker->company(),
            'issue_date' => $this->faker->date(),
            'credential_id' => $this->faker->uuid(),
            'credential_url' => $this->faker->url(),
            'sort_order' => 0,
        ];
    }
}
