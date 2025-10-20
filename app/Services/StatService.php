<?php

namespace App\Services;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StatService
{
    public function getTaskCompletionWithin(Carbon $start, Carbon $end)
    {
        $tasks = Task::select(
            DB::raw('DATE(completed_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->whereBetween('completed_at', [$start, $end])
            ->groupBy('date')
            ->get()
            ->keyBy('date');

        return $tasks;
    }
}
