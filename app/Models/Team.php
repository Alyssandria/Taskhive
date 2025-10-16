<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Team extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    /**
     * Gets the users that belongs to the specific team
     * @return BelongsToMany<User,Team,Pivot>
     */
    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'team_users')->withTimestamps();
    }
    /**
     * Get the projects that this team have
     * @return BelongsToMany<Project,Team,Pivot>
     */
    public function projects(): BelongsToMany {
        return $this->belongsToMany(Project::class, 'project_teams')->withTimestamps();
    }
}
