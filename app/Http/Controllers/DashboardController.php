<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use App\Services\ProjectService;
use App\Services\TeamService;
use App\Services\UserService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(TeamService $teams, UserService $users, ProjectService $projects)
    {
        $user = User::find(1);
        $role = $users->getHighestRole($user);

        $dashboardData = [];

        switch ($role->slug) {
            case 'admin':
                $dashboardData = [
                    'totalUsers' => User::count(),
                    'totalTeams' => Team::count(),
                    'totalProjects' => Project::count(),
                ];
                break;

            case 'member':
                $dashboardData = [
                    'assignedProjects' => $projects->countProjectsByMember($user->id),
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
