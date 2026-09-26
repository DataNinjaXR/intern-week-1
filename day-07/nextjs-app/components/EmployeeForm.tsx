"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { CreateEmployeeInput } from "@/lib/api";

interface EmployeeFormProps {
  initialValues?: Partial<CreateEmployeeInput>;
  onSubmit: (data: CreateEmployeeInput) => Promise<void>;
  submitButtonText?: string;
  isEditing?: boolean;
}

export default function EmployeeForm({
  initialValues = {},
  onSubmit,
  submitButtonText = "Save Employee",
  isEditing = false,
}: EmployeeFormProps) {
  const [name, setName] = useState(initialValues.name || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [department, setDepartment] = useState(initialValues.department || "IT");
  const [position, setPosition] = useState(initialValues.position || "");
  const [status, setStatus] = useState(initialValues.status || "Active");
  const [salary, setSalary] = useState(
    initialValues.salary !== undefined ? String(initialValues.salary) : ""
  );
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [website, setWebsite] = useState(initialValues.website || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!department.trim()) {
      setError("Department is required.");
      return;
    }
    if (!salary || isNaN(Number(salary))) {
      setError("Valid salary is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await onSubmit({
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        position: position.trim() || undefined,
        status: status || "Active",
        salary: Number(salary),
        phone: phone.trim() || undefined,
        website: website.trim() || undefined,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save employee.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-medium placeholder:text-slate-400 focus:outline-hidden focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition shadow-2xs";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)} className="font-bold ml-4">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Doe"
            className={inputClasses}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. jane@example.com"
            className={inputClasses}
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={inputClasses}
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {/* Position */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Position / Title
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Senior Software Engineer"
            className={inputClasses}
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Salary ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g. 60000"
            className={inputClasses}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={inputClasses}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 555-123-4567"
            className={inputClasses}
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Website / Portfolio
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="e.g. janedoe.dev"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <Link
          href="/employees"
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : submitButtonText}
        </button>
      </div>
    </form>
  );
}
