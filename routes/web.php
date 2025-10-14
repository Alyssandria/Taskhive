<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;

Route::controller(DashboardController::class)
    ->group(function () {
        Route::get('/', 'index')->name('home');
    });

Route::controller(ProjectController::class)
    ->group(function () {
        Route::get('/project/{teamId}/{projectId}', 'show')
            ->name('project.show');
    });
