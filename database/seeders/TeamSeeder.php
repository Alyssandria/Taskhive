<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Team::query()->create([
            'name' => "QA Team",
            'description' => fake()->paragraph()
        ]);

        Team::query()->create([
            'name' => "Designer Team",
            'description' => fake()->paragraph()
        ]);

        Team::query()->create([
            'name' => "Dev Team",
            'description' => fake()->paragraph()
        ]);
    }
}
