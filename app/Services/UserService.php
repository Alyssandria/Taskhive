<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getRoles(User $user)
    {
        return $user->roles()->get()->makeHidden(['pivot']);
    }

    public function getHighestRole(User $user)
    {
        return $this->getRoles($user)->sortByDesc('level')->first();
    }
}
