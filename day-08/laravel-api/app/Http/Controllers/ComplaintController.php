<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComplaintController extends Controller
{
    /**
     * Display a listing of complaints with optional status & priority filtering.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Complaint::with('facility');

        if ($request->has('facility_id') && ! empty($request->facility_id)) {
            $query->where('facility_id', $request->facility_id);
        }

        if ($request->has('status') && ! empty($request->status)) {
            $query->where('status', $request->status);
        }

        if ($request->has('priority') && ! empty($request->priority)) {
            $query->where('priority', $request->priority);
        }

        $complaints = $query->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $complaints,
        ]);
    }

    /**
     * Store a newly created complaint.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'facility_id' => 'required|exists:facilities,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:Open,In Progress,Resolved',
            'priority' => 'required|in:Low,Medium,High,Critical',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $complaint = Complaint::create($validator->validated());
        $complaint->load('facility');

        return response()->json([
            'success' => true,
            'message' => 'Complaint created successfully',
            'data' => $complaint,
        ], 201);
    }

    /**
     * Display the specified complaint.
     */
    public function show($id): JsonResponse
    {
        $complaint = Complaint::with('facility')->find($id);

        if (! $complaint) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $complaint,
        ]);
    }

    /**
     * Update the specified complaint.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $complaint = Complaint::find($id);

        if (! $complaint) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'facility_id' => 'required|exists:facilities,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:Open,In Progress,Resolved',
            'priority' => 'required|in:Low,Medium,High,Critical',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $complaint->update($validator->validated());
        $complaint->load('facility');

        return response()->json([
            'success' => true,
            'message' => 'Complaint updated successfully',
            'data' => $complaint,
        ]);
    }

    /**
     * Remove the specified complaint.
     */
    public function destroy($id): JsonResponse
    {
        $complaint = Complaint::find($id);

        if (! $complaint) {
            return response()->json([
                'success' => false,
                'message' => 'Complaint not found',
            ], 404);
        }

        $complaint->delete();

        return response()->json([
            'success' => true,
            'message' => 'Complaint deleted successfully',
        ]);
    }
}
