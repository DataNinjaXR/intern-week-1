<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Facility;
use App\Models\Inspection;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get summary metrics and recent items for the dashboard.
     */
    public function stats(): JsonResponse
    {
        $totalFacilities = Facility::count();
        $totalInspections = Inspection::count();
        $openComplaints = Complaint::where('status', 'Open')->count();
        $inProgressComplaints = Complaint::where('status', 'In Progress')->count();
        $resolvedComplaints = Complaint::where('status', 'Resolved')->count();

        $poorCriticalFacilities = Facility::whereIn('status', ['Poor', 'Critical'])->count();

        $recentInspections = Inspection::with('facility')
            ->orderBy('inspection_date', 'desc')
            ->limit(5)
            ->get();

        $recentComplaints = Complaint::with('facility')
            ->latest()
            ->limit(5)
            ->get();

        $facilitiesByStatus = Facility::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        $complaintsByPriority = Complaint::selectRaw('priority, count(*) as count')
            ->groupBy('priority')
            ->pluck('count', 'priority');

        return response()->json([
            'success' => true,
            'data' => [
                'total_facilities' => $totalFacilities,
                'total_inspections' => $totalInspections,
                'open_complaints' => $openComplaints,
                'in_progress_complaints' => $inProgressComplaints,
                'resolved_complaints' => $resolvedComplaints,
                'poor_critical_facilities' => $poorCriticalFacilities,
                'facilities_by_status' => $facilitiesByStatus,
                'complaints_by_priority' => $complaintsByPriority,
                'recent_inspections' => $recentInspections,
                'recent_complaints' => $recentComplaints,
            ],
        ]);
    }
}
