<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectTeam;
use App\Models\Role;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use App\Models\RoleUser;
use App\Models\Status;
use App\Models\Task;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleUserSeeder;
use Database\Seeders\TeamSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $tables = collect([
            [
                'check' => User::count() == 0,
                'call' => fn () => User::factory(10)->create()
            ],
            [
                'check' => Role::count() == 0,
                'call' => fn () => $this->call(RoleSeeder::class)
            ],
            [
                'check' => RoleUser::count() == 0,
                'call' => fn () => $this->call(RoleUserSeeder::class)
            ],
            [
                'check' => Team::count() == 0,
                'call' => fn () => $this->call(TeamSeeder::class)
            ],
            [
                'check' => TeamUser::count() == 0,
                'call' => fn () => $this->call(TeamUserSeeder::class)
            ],
            [
                'check' => Project::count() == 0,
                'call' => fn () => Project::factory(5)->create()
            ],
            [
                'check' => ProjectTeam::count() == 0,
                'call' => fn () => $this->call(ProjectTeamSeeder::class)
            ],
            [
                'check' => Status::count() == 0,
                'call' => fn () => $this->call(StatusSeeder::class)
            ],
            [
                'check' => Task::count() == 0,
                'call' => fn () => $this->call(TaskSeeder::class)
            ],
        ]);

        $tables->each(function ($item) {
            if ($item['check']) {
                $item['call']();
            }
        });
    }
}
