<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Role extends Model
{

    protected $fillable = [
        'name',
        'slug'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    /**
     * Gets the users that has the corresponding role
     * @return BelongsToMany<User,Role,Pivot>
     */
    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'role_users');
    }
    /**
     * Gets the permissions that this role have
     * @return BelongsToMany<Permission,Role,Pivot>
     */
    public function permissions(): BelongsToMany {
        return $this->belongsToMany(Permission::class, 'permission_roles');
    }
}
