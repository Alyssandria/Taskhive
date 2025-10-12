<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function show(Request $request, ProjectService $projects, int $id) {
        // $user = $request->user();
        $user = User::first();

        $project = $projects->findInUser($user, $id);

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
                'users' => $projects
                    ->getProjectUsers($project),
                'tasks' => $project
                    ->tasks()
                    ->with(['users:id,avatar,email', 'status'])
                    ->get()
                    ->map(function ($task) {
                        return [
                            ...collect($task),
                            'users' => $task->users->makeHidden('pivot')
                        ];
                    })
            ]
        ]);
    }
}
