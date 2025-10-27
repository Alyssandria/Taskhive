<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use App\Services\ProjectService;
use App\Services\StatService;
use App\Services\TaskService;
use App\Services\TeamService;
use App\Services\UserService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(
        UserService $users,
        StatService $stats,
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
                    'tables' => [
                        'projects' => fn() => $stats->getProjectsStat(),
                        'teams' => fn() => $stats->getTeamStats()->makeHidden('description')
                    ]
                ];
                break;
            case 'member':
                $dashboardData = [
                    'cards' => [
                        'uncompletedTasks' => fn() => $user->tasks()->whereNull('completed_at')->count(),
                        'projects' => fn() => $user->projects()->flatten()->unique('id')->count(),
                        'teams' => fn() => $user->teams()->count(),
                    ],
                    'tables' => Inertia::scroll(fn() => $user->tasks()->with('users', 'status')->paginate(10))
                ];
        };


        return Inertia::render('welcome', [
            'server' => [
                'role' => $role,
                'dashboardData' => $dashboardData,
            ]
        ]);
    }
}
