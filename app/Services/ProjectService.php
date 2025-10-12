<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProjectService
{
    public function get(Team $team)
    {
        return $team->projects()->get();
    }

    public function getWithTasks(Project $project) {
        return $project->load('tasks')->get()->makeHidden("pivot");
    }

    public function findInUser(User $user, int $id) {
        /** 
         * Fetches the project with the given ID that belongs to any of the teams the user is part of.
         * @var Builder $query 
         * */
        return Project::where('id', $id)
            ->whereHas('teams', function (Builder $query) use ($user) {
                $query->whereHas('users', function (Builder $query) use ($user) {
                    $query->where('users.id', $user->id);
                });
            })->first();
    }
}
