<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InspectionController extends Controller
{
    /**
     * Display a listing of inspections.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Inspection::with('facility');

        if ($request->has('facility_id') && ! empty($request->facility_id)) {
            $query->where('facility_id', $request->facility_id);
        }

        if ($request->has('condition') && ! empty($request->condition)) {
            $query->where('condition', $request->condition);
        }

        $inspections = $query->orderBy('inspection_date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $inspections,
        ]);
    }

    /**
     * Store a newly created inspection.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'facility_id' => 'required|exists:facilities,id',
            'inspector_name' => 'required|string|max:255',
            'inspection_date' => 'required|date',
            'condition' => 'required|in:Good,Average,Poor,Critical',
            'remarks' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $inspection = Inspection::create($validator->validated());
        $inspection->load('facility');

        return response()->json([
            'success' => true,
            'message' => 'Inspection created successfully',
            'data' => $inspection,
        ], 201);
    }

    /**
     * Display the specified inspection.
     */
    public function show($id): JsonResponse
    {
        $inspection = Inspection::with('facility')->find($id);

        if (! $inspection) {
            return response()->json([
                'success' => false,
                'message' => 'Inspection not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $inspection,
        ]);
    }

    /**
     * Update the specified inspection.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $inspection = Inspection::find($id);

        if (! $inspection) {
            return response()->json([
                'success' => false,
                'message' => 'Inspection not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'facility_id' => 'required|exists:facilities,id',
            'inspector_name' => 'required|string|max:255',
            'inspection_date' => 'required|date',
            'condition' => 'required|in:Good,Average,Poor,Critical',
            'remarks' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $inspection->update($validator->validated());
        $inspection->load('facility');

        return response()->json([
            'success' => true,
            'message' => 'Inspection updated successfully',
            'data' => $inspection,
        ]);
    }

    /**
     * Remove the specified inspection.
     */
    public function destroy($id): JsonResponse
    {
        $inspection = Inspection::find($id);

        if (! $inspection) {
            return response()->json([
                'success' => false,
                'message' => 'Inspection not found',
            ], 404);
        }

        $inspection->delete();

        return response()->json([
            'success' => true,
            'message' => 'Inspection deleted successfully',
        ]);
    }
}
