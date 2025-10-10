<?php

namespace App\Services;

use App\Models\Team;

class ProjectService
{
    public function get(Team $team)
    {
        return $team->projects()->get();
    }
}
