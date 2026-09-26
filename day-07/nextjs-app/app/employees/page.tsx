"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmployeeTable from "@/components/EmployeeTable";
import DeleteModal from "@/components/DeleteModal";
import { getEmployees, deleteEmployee, Employee } from "@/lib/api";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err: unknown) {
      console.error("Failed to fetch employees:", err);
      setError(err instanceof Error ? err.message : "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  // Derive unique department options from actual employee data + defaults
  const departmentOptions = useMemo(() => {
    const defaultDepts = ["IT", "HR", "Finance", "Marketing"];
    const loadedDepts = employees.map((e) => e.department).filter(Boolean);
    const combined = Array.from(new Set([...defaultDepts, ...loadedDepts]));
    return ["All", ...combined];
  }, [employees]);

  // Client-side search and filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // 1. Search Query Filter (name, email, department, position)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (emp.name && emp.name.toLowerCase().includes(q)) ||
        (emp.email && emp.email.toLowerCase().includes(q)) ||
        (emp.department && emp.department.toLowerCase().includes(q)) ||
        (emp.position && emp.position.toLowerCase().includes(q));

      // 2. Department Filter
      const matchesDept =
        departmentFilter === "All" || emp.department === departmentFilter;

      // 3. Status Filter
      const status = emp.status || "Active";
      const matchesStatus =
        statusFilter === "All" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchQuery, departmentFilter, statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setIsDeleting(true);
      await deleteEmployee(deleteTarget.id);
      setEmployees((prev) => prev.filter((e) => e.id !== deleteTarget.id));
      setSuccessMsg(`Successfully deleted ${deleteTarget.name}.`);
      setDeleteTarget(null);

      // Clear success notification after 4s
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete employee");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          title="Employees"
          subtitle="Manage, search, and filter employee records"
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        <div className="p-6 md:p-8 space-y-6">
          {/* Top Actions & Page Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">All Employees</h1>
              <p className="text-sm text-slate-500 mt-1">
                {filteredEmployees.length} {filteredEmployees.length === 1 ? "employee" : "employees"} displayed
              </p>
            </div>

            <Link
              href="/employees/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Employee
            </Link>
          </div>

          {/* Notifications */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between">
              <div>{error}</div>
              <button onClick={() => setError(null)} className="text-red-700 font-bold ml-4">✕</button>
            </div>
          )}

          {successMsg && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 flex items-center justify-between">
              <div>{successMsg}</div>
              <button onClick={() => setSuccessMsg(null)} className="text-emerald-800 font-bold ml-4">✕</button>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <svg
                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, department, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
              />
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dept:</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="py-2.5 px-3 rounded-lg border border-slate-300 text-sm bg-white text-slate-900 font-medium focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
              >
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-2.5 px-3 rounded-lg border border-slate-300 text-sm bg-white text-slate-900 font-medium focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Employee Table Component */}
          <EmployeeTable
            employees={filteredEmployees}
            loading={loading}
            onDeleteClick={(emp) => setDeleteTarget(emp)}
          />
        </div>
      </main>

      {/* Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        employeeName={deleteTarget?.name || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}