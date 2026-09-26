"use client";

import Link from "next/link";
import { Employee } from "@/lib/api";

interface EmployeeTableProps {
  employees: Employee[];
  onDeleteClick: (employee: Employee) => void;
  loading: boolean;
}

export default function EmployeeTable({
  employees,
  onDeleteClick,
  loading,
}: EmployeeTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500 shadow-sm">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-slate-800 mb-3"></div>
        <p>Loading employee data...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-900">No employees found</h3>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your search or filter to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-4">Employee</th>
              <th scope="col" className="px-6 py-4">Department</th>
              <th scope="col" className="px-6 py-4">Position</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => {
              const status = emp.status || "Active";
              const isStatusActive = status.toLowerCase() === "active";

              return (
                <tr key={emp.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-semibold text-sm shadow-xs">
                        {emp.name ? emp.name.charAt(0).toUpperCase() : "E"}
                      </div>
                      <div>
                        <Link
                          href={`/employees/${emp.id}`}
                          className="font-medium text-slate-900 hover:text-slate-700 transition"
                        >
                          {emp.name}
                        </Link>
                        <p className="text-xs text-slate-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {emp.position || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        isStatusActive
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium space-x-2">
                    <Link
                      href={`/employees/${emp.id}`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition inline-block"
                    >
                      View
                    </Link>
                    <Link
                      href={`/employees/${emp.id}/edit`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition inline-block"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDeleteClick(emp)}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition inline-block"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
