<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ProjectService;
use App\Services\TaskService;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function show(Request $request, TaskService $tasks, TeamService $teams, ProjectService $projects, int $teamId ,int $projectId) {
        // $user = $request->user();
        $user = User::first();

        $project = $projects->findInUser($user, $projectId);

        if ($project == null){
            return abort(404);
        }

        return Inertia::render("projects/show", [
            'server' => [
                'project' => [
                    ...collect($project)
                        ->only([
                            'id',
                            'name',
                            'description'
                        ]),
                ],
                'team' => $teams->getById($teamId)->only(['id', 'name']),
                'users' => $projects->getProjectUsers($project),
                'tasks' =>  $tasks->getProjectTasks($project)
                ]
        ]);
    }
}
