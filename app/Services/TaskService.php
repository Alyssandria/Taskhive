<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TaskService
{
    public function getProjectTasks(Project $project)
    {
        return $project->tasks()
            ->with(['users', 'status'])
            ->get()
            ->map(function ($task) {
                return [
                    ...collect($task),
                    'users' => $task->users->makeHidden('pivot')
                ];
            });
    }

    public function getAllCompleted($timeFrame = 'weekly')
    {
        $data = collect();

        switch ($timeFrame) {
            case 'weekly':
                $end = Carbon::now();
                $start = $end->copy()->subDay(6);
                $current = $start->copy();

                $tasks = Task::select(
                    DB::raw('DATE(completed_at) as date'),
                    DB::raw('COUNT(*) as count')
                )
                    ->whereBetween('completed_at', [$start, $end])
                    ->groupBy('date')
                    ->get()
                    ->keyBy('date');


                while ($current->lte($end)) {
                    $data->push([
                        'x' => $current->toDateString() == $end->toDateString() ? 'Today' : $current->format('D'),
                        'completed' => $tasks[$current->toDateString()]->count ?? 0,
                    ]);

                    $current->addDay();
                }
        }

        return $data;
    }
}
