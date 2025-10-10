<?php

namespace App\Services;

use App\Models\Team;
use App\Models\User;

class TeamService
{
    public function getWith(User $user, string $pivot, ?string $columns = null)
    {
        return $user->teams()->with($columns ? "$pivot:$columns" : "$pivot")->get()->mapWithKeys(function (Team $team) use ($pivot) {
            return [
                $team->id => [
                    ...collect($team)->except('pivot'),
                    $pivot => $team->$pivot->makeHidden('pivot'),
                ]
            ];
        });
    }
}
