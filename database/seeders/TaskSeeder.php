<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for ($i = 0; $i < 45; $i++) {
            $user = User::inRandomOrder()->first();
            $task = Task::create([
                'title' => fake()->word(),
                'description' => fake()->sentence(),
                'due' => fake()->dateTimeBetween('now', '+1 month'),
                'start' => fake()->dateTimeBetween('-1 month', 'now'),
                'project_id' => $user->teams()->inRandomOrder()->first()->projects()->inRandomOrder()->first()->id,
                'status_id' => Status::inRandomOrder()->first()->id
            ]);
            $user->tasks()->attach($task->id);
        }
    }
}
