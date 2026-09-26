<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\JsonResponse;

class DepartmentController extends Controller
{
    public function index(): JsonResponse
    {
        $departments = Department::withCount('employees')->get();

        return response()->json([
            'success' => true,
            'data' => $departments,
        ]);
    }

    public function show($id): JsonResponse
    {
        $department = Department::with('employees')->find($id);

        if (! $department) {
            return response()->json([
                'success' => false,
                'message' => 'Department not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $department,
        ]);
    }
}
