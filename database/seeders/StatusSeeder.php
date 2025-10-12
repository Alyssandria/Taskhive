<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::create([
            'name' => 'Completed',
            'slug' => 'completed',
            'description' => 'Task is completed'
        ]);

        Status::create([
            'name' => 'Pending',
            'slug' => 'pending',
            'description' => 'Task is currently being worked on'
        ]);
    }

}
