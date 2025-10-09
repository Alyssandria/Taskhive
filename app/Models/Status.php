<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    /**
     * Gets the tasks that has the corresponding status
     * @return HasMany<Task,Status>
     */
    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }
}
