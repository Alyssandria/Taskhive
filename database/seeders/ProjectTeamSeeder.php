<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Team;
use Illuminate\Database\Seeder;

class ProjectTeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Team::all()->each(function (Team $team) {
            $ids = Project::inRandomOrder()
                ->take(fake()->numberBetween(1, Project::count()))
                ->pluck('id');

            $team->projects()->syncWithoutDetaching($ids);
        });
        //
    }
}
