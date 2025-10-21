<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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

    public function getProjectsStat()
    {
        $data = Project::with(['tasks', 'teams.users'])->get();

        return $data->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'tasks' => [
                    'total' => $item->tasks->count(),
                    'completed' => $item->tasks->whereNotNull('completed_at')->count()
                ],
                'teams' => $item->teams->count(),
                'users' => $item->teams->flatMap->users->unique('id')->count()
            ];
        });
    }

    public function getTeamStats()
    {
        $data = Team::withCount(['users', 'projects'])->get();

        return $data;
    }
}
