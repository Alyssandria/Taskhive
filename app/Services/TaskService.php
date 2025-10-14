<?php

namespace App\Services;

use App\Models\Project;

class TaskService
{
    public function getProjectTasks(Project $project) {
        return $project->tasks()
            ->with(['users', 'status'])
            ->get()
            ->map(function ($task) {
                return [
                    ...collect($task),
                    'users' => $task->users->makeHidden('pivot')
                ];
            });
    }
}