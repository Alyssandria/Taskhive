<?php

namespace App\Http\Controllers;

use App\Services\TaskService;

class ApiController extends Controller
{
    public function tasksCompletedStats(TaskService $tasks)
    {
        $data = $tasks->getAllCompleted();
        return response()->json($data);
    }
}
