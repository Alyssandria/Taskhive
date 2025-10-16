<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::all()->each(function (User $user) {
            $ids = Role::inRandomOrder()
                ->take(fake()->numberBetween(1, Role::count()))
                ->pluck('id');
            $user->roles()->syncWithoutDetaching($ids);
        });

    }
}
