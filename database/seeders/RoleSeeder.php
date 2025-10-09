<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::query()->create([
            'name' => 'Admin Role',
            'slug' => 'admin',
        ]);

        Role::query()->create([
            'name' => 'Manager Role',
            'slug' => 'manager',
        ]);

        Role::query()->create([
            'name' => 'Member',
            'slug' => 'member',
        ]);
    }
}
