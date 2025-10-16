<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Project::all()->each(function () {
            for ($i = 0; $i < fake()->numberBetween(5, 45); $i++) {
                $user = User::inRandomOrder()->first();
                $project = $user->teams()->inRandomOrder()->first()->projects()->inRandomOrder()->first();

                $task = Task::create([
                    'title' => fake()->word(),
                    'description' => fake()->sentence(),
                    'due' => fake()->dateTimeBetween('now', '+1 month'),
                    'start' => fake()->dateTimeBetween('-1 month', 'now'),
                    'project_id' => $project->id,
                    'status_id' => Status::inRandomOrder()->first()->id
                ]);

                $task->users()->sync(User::whereHas('teams', function (Builder $query) use ($project){
                    $query->whereHas('projects', function (Builder $query) use ($project){
                        $query->where('projects.id', $project->id);
                    });
                })->take(fake()->numberBetween(1, User::count()))->pluck('id'));
            }
        });
    }
}
