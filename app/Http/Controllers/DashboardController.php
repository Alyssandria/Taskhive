<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use App\Services\ProjectService;
use App\Services\TeamService;
use Inertia\Inertia;
use function Laravel\Prompts\info;

class DashboardController extends Controller
{
    public function index(TeamService $teams, ProjectService $projects)
    {
        $user = User::find(1);

        return Inertia::render('welcome', [
            'server' => [
                'teams' => $teams->getWith($user, 'projects')
            ]
        ]);
    }
}
