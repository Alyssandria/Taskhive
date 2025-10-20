<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function tasksCompletedStats(Request $request, TaskService $tasks)
    {
        $data = $tasks->getAllCompleted();
        return response()->json($data);
    }
}
