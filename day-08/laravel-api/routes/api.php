<?php

use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\InspectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Facility Inspection & Complaint Management System REST API
|
*/

// Dashboard Statistics
Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

// Main Entity Resources (CRUD)
Route::apiResource('facilities', FacilityController::class);
Route::apiResource('inspections', InspectionController::class);
Route::apiResource('complaints', ComplaintController::class);

// Secondary Resources
Route::apiResource('departments', DepartmentController::class)->only(['index', 'show']);
Route::apiResource('employees', EmployeeController::class)->only(['index', 'show']);

// Middleware & Auth Demonstration Endpoint
Route::middleware('api.auth')->prefix('protected')->group(function () {
    Route::get('/user-info', function (Request $request) {
        return response()->json([
            'success' => true,
            'message' => 'Access granted to protected API area!',
            'user' => [
                'name' => 'Authenticated Auditor',
                'role' => 'System Administrator',
                'granted_at' => now()->toIso8601String(),
            ],
            'middleware' => 'ApiAuthMiddleware verified X-API-Key header successfully',
        ]);
    });
});
