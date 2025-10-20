<?php

namespace App\Http\Controllers;

use App\Services\StatService;
use App\Services\TaskService;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function tasksCompletedStats(StatService $stats, Request $request, TaskService $tasks)
    {
        $data = collect();

        $end = Carbon::now(); // DEFAULT
        $start = $end->copy(); // DEFAULT
        $segments = 7; // DEFAULT
        $labelFormatter = null;

        switch ($request->range) {
            case "1M":
                $start = $end->copy()->subMonth();
                $segments = 5;
                $labelFormatter = fn(Carbon $start, Carbon $end) => $start->format('M d') . ' - ' . $end->format('M d');
                break;
            case "6M":
                $start = $end->copy()->subMonth(6);
                $segments = 6;
                $labelFormatter = fn(Carbon $start, Carbon $end) => $start->format('M d') . ' - ' . $end->format('M d');
                break;
            case "1Y":
                $start = $end->copy()->subYear();
                $segments = 12;
                $labelFormatter = fn(Carbon $start, Carbon $end) => $start->format('M');
                break;
            default:
                $start = $end->copy()->subDay(6);
                $labelFormatter = fn(Carbon $start, Carbon $rangeEnd) => $rangeEnd->equalTo($start) ? "Today" :  $start->format('M d');
                break;
        }

        $daysPerSegment = max(1, floor($start->diffInDays($end) / $segments));
        $completions = $stats->getTaskCompletionWithin($start, $end);

        $currentStart = $start->copy();

        for ($i = 0; $i < $segments; $i++) {
            $segmentRangeEnd = $currentStart->copy()->addDays($daysPerSegment);

            if ($segmentRangeEnd->gt($end)) {
                $segmentRangeEnd = $end->copy();
            }

            $count = $completions->filter(function ($completion) use ($currentStart, $segmentRangeEnd) {
                $date = Carbon::parse($completion['date']);
                return $date->between($currentStart, $segmentRangeEnd);
            })->sum('count');

            $data->push([
                'x' => $labelFormatter($currentStart, $segmentRangeEnd),
                'completed' => $count
            ]);

            if ((!$request->range) || $request->range === "1W") {
                $currentStart = $segmentRangeEnd->copy();
                continue;
            }

            $currentStart = $segmentRangeEnd->copy()->addDay();
        }

        return response()->json($data);
    }
}
