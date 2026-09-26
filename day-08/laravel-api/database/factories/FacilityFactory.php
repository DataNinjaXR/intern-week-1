<?php

namespace Database\Factories;

use App\Models\Facility;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Facility>
 */
class FacilityFactory extends Factory
{
    protected $model = Facility::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company().' Building',
            'location' => fake()->address(),
            'type' => fake()->randomElement(['Office Building', 'Laboratory', 'Warehouse', 'Parking Structure', 'Dining Facility']),
            'status' => fake()->randomElement(['Good', 'Average', 'Poor', 'Critical']),
            'description' => fake()->sentence(),
        ];
    }
}
