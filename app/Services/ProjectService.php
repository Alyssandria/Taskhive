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

    public function getProjectUsers(Project $project) {
        return User::whereHas('teams', function (Builder $query) use ($project) {
            $query->whereHas('projects', function (Builder $query) use ($project) {
                $query->where('projects.id', $project->id);
            });
        })->get();
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
