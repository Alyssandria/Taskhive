<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Permission extends Model
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
     * @return BelongsToMany<Role,Permission,Pivot>
     */
    public function role(): BelongsToMany {
        return $this->belongsToMany(Role::class, 'permission_roles')->withTimestamps();
    }
}
