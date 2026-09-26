"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DeleteModal from "@/components/DeleteModal";
import { getEmployee, deleteEmployee, Employee } from "@/lib/api";

export default function EmployeeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployee(id);
      setEmployee(data);
    } catch (err: unknown) {
      console.error("Error fetching employee:", err);
      setError(err instanceof Error ? err.message : "Employee not found");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!employee) return;
    try {
      setIsDeleting(true);
      await deleteEmployee(employee.id);
      router.push("/employees");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete employee");
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const isStatusActive = (employee?.status || "Active").toLowerCase() === "active";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          title="Employee Profile"
          subtitle="Detailed view of employee information"
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        <div className="p-6 md:p-8 space-y-6 max-w-4xl">
          {/* Back Navigation */}
          <div>
            <Link
              href="/employees"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition mb-2"
            >
              ← Back to Employees
            </Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500 shadow-sm">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-slate-800 mb-3"></div>
              <p>Loading employee profile...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 text-center text-sm text-red-700 shadow-sm">
              <h3 className="font-bold text-lg mb-1">Employee Not Found</h3>
              <p className="text-slate-600">{error}</p>
              <Link
                href="/employees"
                className="mt-4 inline-block px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
              >
                Return to Employee List
              </Link>
            </div>
          ) : employee ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {/* Profile Header Card */}
              <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/50">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold text-2xl shadow-sm">
                    {employee.name ? employee.name.charAt(0).toUpperCase() : "E"}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {employee.name}
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">
                      {employee.position || "Employee"} • {employee.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                      isStatusActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {employee.status || "Active"}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{employee.email}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{employee.department}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Position</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{employee.position || "—"}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salary</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">
                    ${employee.salary ? employee.salary.toLocaleString() : "0"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{employee.phone || "—"}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{employee.website || "—"}</dd>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 bg-slate-50/30 flex items-center justify-between">
                <Link
                  href="/employees"
                  className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  ← Back
                </Link>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-4 py-2 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    Delete Employee
                  </button>
                  <Link
                    href={`/employees/${employee.id}/edit`}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 transition"
                  >
                    Edit Employee
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        employeeName={employee?.name || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
        isDeleting={isDeleting}
      />
    </div>
  );
}