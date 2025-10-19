<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use App\Services\ProjectService;
use App\Services\TaskService;
use App\Services\TeamService;
use App\Services\UserService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(
        TeamService $teams,
        UserService $users,
        ProjectService $projects,
        TaskService $tasks
    ) {
        $user = User::find(2);
        $role = $users->getHighestRole($user);

        $dashboardData = [];

        switch ($role->slug) {
            case 'admin':
                $dashboardData = [
                    'cards' => [
                        'totalUsers' => fn() => User::count(),
                        'totalTeams' => fn() => Team::count(),
                        'totalProjects' => fn() => Project::count(),
                        'totalTasks' => fn() => Task::count()
                    ],
                ];
                break;
        };

        return Inertia::render('welcome', [
            'server' => [
                'role' => $role,
                'dashboardData' => $dashboardData,
            ]
        ]);
    }
}
