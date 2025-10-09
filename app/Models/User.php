<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'avatar',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
    /**
     * Gets the roles of the corresponding user
     * @return BelongsToMany<Role,User,Pivot>
     */
    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class, 'role_users');
    }
    /**
     * Gets the teams that the user belongs to
     * @return BelongsToMany<Team,User,Pivot>
     */
    public function teams(): BelongsToMany {
        return $this->belongsToMany(Team::class, 'team_users');
    }
    /**
     * Gets the tasks of the corresponding user
     * @return BelongsToMany<Task,User,Pivot>
     */
    public function tasks(): BelongsToMany {
        return $this->belongsToMany(Task::class, 'task_users');
    }
}
