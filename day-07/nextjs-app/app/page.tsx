"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import { getEmployees, Employee } from "@/lib/api";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err: unknown) {
      console.error("Error fetching employees:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (emp) => (emp.status || "Active").toLowerCase() === "active"
  ).length;
  const uniqueDepartments = new Set(
    employees.map((emp) => emp.department).filter(Boolean)
  ).size;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          title="Dashboard"
          subtitle="Overview of your employee management system"
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        <div className="p-6 md:p-8 space-y-8">
          {/* Welcome section */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, Admin 👋
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s what&apos;s happening with your employees today.
            </p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between">
              <div>
                <span className="font-semibold">Error:</span> {error} (Ensure backend server is running on http://localhost:5000)
              </div>
              <button
                onClick={fetchData}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Employees"
              value={loading ? "..." : totalEmployees}
              badgeText="Employees"
            />
            <StatCard
              title="Active Employees"
              value={loading ? "..." : activeEmployees}
              badgeText="Active"
              badgeVariant="success"
            />
            <StatCard
              title="Departments"
              value={loading ? "..." : uniqueDepartments}
              badgeText="Departments"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Recent Employees */}
            <div className="rounded-xl border border-slate-200 bg-white lg:col-span-2 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 p-6">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Recent Employees
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Latest employees added to the system
                  </p>
                </div>
                <Link
                  href="/employees"
                  className="text-sm font-medium text-slate-700 hover:text-slate-950 transition"
                >
                  View all →
                </Link>
              </div>

              {loading ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  Loading employees...
                </div>
              ) : employees.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No employees found. <Link href="/employees/create" className="text-slate-900 font-semibold underline">Add your first employee</Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {employees.slice(0, 5).map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-4 px-6 hover:bg-slate-50/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700 text-sm border border-slate-200">
                          {employee.name ? employee.name.charAt(0).toUpperCase() : "E"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {employee.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {employee.position ? `${employee.position} • ` : ""}{employee.department}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          (employee.status || "Active").toLowerCase() === "active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {employee.status || "Active"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <h2 className="font-semibold text-slate-900">
                Quick Actions
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Frequently used management shortcuts
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href="/employees"
                  className="block rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/80 group"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-950 flex items-center justify-between">
                    View Employees
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Browse and filter all employee records
                  </p>
                </Link>

                <Link
                  href="/employees/create"
                  className="block rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50/80 group"
                >
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-950 flex items-center justify-between">
                    Add Employee
                    <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Register a new staff member
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}