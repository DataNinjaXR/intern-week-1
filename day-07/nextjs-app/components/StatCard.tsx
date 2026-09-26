"use client";

interface StatCardProps {
  title: string;
  value: number | string;
  badgeText: string;
  badgeVariant?: "default" | "success";
}

export default function StatCard({ title, value, badgeText, badgeVariant = "default" }: StatCardProps) {
  const badgeClasses =
    badgeVariant === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeClasses}`}>
          {badgeText}
        </span>
      </div>
    </div>
  );
}
