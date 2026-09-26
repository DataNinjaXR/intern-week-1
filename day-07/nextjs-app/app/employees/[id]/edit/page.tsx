"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmployeeForm from "@/components/EmployeeForm";
import { getEmployee, updateEmployee, Employee, CreateEmployeeInput } from "@/lib/api";

export default function EditEmployeePage({
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

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
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

  const handleUpdate = async (formData: CreateEmployeeInput) => {
    await updateEmployee(id, formData);
    router.push(`/employees/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          title="Edit Employee"
          subtitle="Update existing employee details"
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        <div className="p-6 md:p-8 space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Edit Employee Details
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Update information for {employee?.name || `Employee #${id}`}
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500 shadow-sm">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-slate-800 mb-3"></div>
              <p>Loading employee details...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl border border-red-200 p-8 text-center text-sm text-red-700 shadow-sm">
              <p className="font-semibold">{error}</p>
            </div>
          ) : employee ? (
            <EmployeeForm
              initialValues={employee}
              onSubmit={handleUpdate}
              submitButtonText="Update Employee"
              isEditing={true}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
