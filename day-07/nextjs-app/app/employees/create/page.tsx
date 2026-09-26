"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmployeeForm from "@/components/EmployeeForm";
import { createEmployee, CreateEmployeeInput } from "@/lib/api";

export default function CreateEmployeePage() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCreate = async (formData: CreateEmployeeInput) => {
    await createEmployee(formData);
    router.push("/employees");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          title="Add Employee"
          subtitle="Create a new employee profile"
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        <div className="p-6 md:p-8 space-y-6 max-w-4xl">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add New Employee</h1>
            <p className="text-sm text-slate-500 mt-1">
              Fill in the details below to add an employee to your organization.
            </p>
          </div>

          <EmployeeForm
            onSubmit={handleCreate}
            submitButtonText="Create Employee"
          />
        </div>
      </main>
    </div>
  );
}