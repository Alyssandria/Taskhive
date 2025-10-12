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

        dd($projects->getWithTasks($project));

        return Inertia::render("projects/show", [
            'project' => collect($project)
                ->only([
                    'id',
                    'name',
                    'description'
                ])
        ]);
    }
}
