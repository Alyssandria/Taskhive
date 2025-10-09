<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    protected $fillable = [
        'task_id',
        'user_id',
        'body',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * Gets the task that this comment is on
     * @return BelongsTo<Task,Comment>
     */
    public function task(): BelongsTo {
        return $this->belongsTo(Task::class);
    }
    /**
     * Gets the user that made the comment
     * @return BelongsTo<User,Comment>
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
