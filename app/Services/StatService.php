<?php

namespace App\Services;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class StatService
{
    public function getTaskCompletionWithin(Carbon $start, Carbon $end)
    {
        $stat = Task::select(
            DB::raw('DATE(completed_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->whereBetween('completed_at', [$start, $end])
            ->groupBy('date')
            ->get()
            ->keyBy('date');
        return $stat;
    }

    public function getTaskPerStatus(): Collection
    {
        $stat = Task::select('status_id', DB::raw('COUNT(*) as count'))
            ->groupBy('status_id')
            ->with('status:id,name,slug')
            ->get();

        return $stat;
    }
}
