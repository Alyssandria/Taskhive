<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'due',
        'start',
        'status_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
    /**
     * Gets the status of task
     * @return BelongsTo<Status,Task>
     */
    public function status(): BelongsTo {
        return $this->belongsTo(Status::class);
    }
    /**
     * Gets the users assigned to this task
     * @return BelongsTo<User,Task>
     */
    public function users(): BelongsToMany {
        return $this->belongsToMany(User::class, 'task_users');
    }
    /**
     * Gets the comments made on this task
     * @return HasMany<Comment,Task>
     */
    public function comments(): HasMany {
        return $this->hasMany(Comment::class);
    }
}
