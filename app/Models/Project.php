<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    /**
     * Gets the teams that the project has
     * @return BelongsToMany<Team,Project,Pivot>
     */
    public function teams(): BelongsToMany {
        return $this->belongsToMany(Team::class, 'project_teams');
    }

    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }
}
