<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::all()->each(function (User $user) {
            $ids = Team::inRandomOrder()
                ->take(fake()->numberBetween(1, Team::count()))
                ->pluck('id');

            $user->teams()->syncWithoutDetaching($ids);
        });
    }
}
