<?php

namespace App\Http\Controllers;

use App\Models\Facility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FacilityController extends Controller
{
    /**
     * Display a listing of facilities.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Facility::withCount(['inspections', 'complaints']);

        if ($request->has('status') && ! empty($request->status)) {
            $query->where('status', $request->status);
        }

        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%");
            });
        }

        $facilities = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $facilities,
        ]);
    }

    /**
     * Store a newly created facility.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'status' => 'required|in:Good,Average,Poor,Critical',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $facility = Facility::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Facility created successfully',
            'data' => $facility,
        ], 201);
    }

    /**
     * Display the specified facility.
     */
    public function show($id): JsonResponse
    {
        $facility = Facility::with(['inspections' => function ($q) {
            $q->latest();
        }, 'complaints' => function ($q) {
            $q->latest();
        }])->find($id);

        if (! $facility) {
            return response()->json([
                'success' => false,
                'message' => 'Facility not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $facility,
        ]);
    }

    /**
     * Update the specified facility.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $facility = Facility::find($id);

        if (! $facility) {
            return response()->json([
                'success' => false,
                'message' => 'Facility not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'status' => 'required|in:Good,Average,Poor,Critical',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $facility->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Facility updated successfully',
            'data' => $facility,
        ]);
    }

    /**
     * Remove the specified facility.
     */
    public function destroy($id): JsonResponse
    {
        $facility = Facility::find($id);

        if (! $facility) {
            return response()->json([
                'success' => false,
                'message' => 'Facility not found',
            ], 404);
        }

        $facility->delete();

        return response()->json([
            'success' => true,
            'message' => 'Facility deleted successfully',
        ]);
    }
}
