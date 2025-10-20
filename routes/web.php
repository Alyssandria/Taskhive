<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ApiController;

Route::controller(DashboardController::class)
    ->group(function () {
        Route::get('/', 'index')->name('home');
    });

Route::controller(ProjectController::class)
    ->group(function () {
        Route::get('/project/{teamId}/{projectId}', 'show')
            ->name('project.show');
    });

Route::controller(ApiController::class)
    ->prefix('api')
    /* ->middleware('auth') */
    ->group(function () {
        Route::get('/stats/tasks/completions', 'tasksCompletedStats')
            ->name('api.stats.tasksCompleted');
        Route::get('/stats/tasks/status', 'taskPerStatus')
            ->name('api.stats.taskPerStatus');
    });
