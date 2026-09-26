"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      name: "Employees",
      href: "/employees",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: "Add Employee",
      href: "/employees/create",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 w-64">
      {/* Brand Logo */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-lg shadow-sm">
            EH
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              EmployeeHub
            </h1>
            <p className="text-xs text-slate-500 font-medium">Management System</p>
          </div>
        </div>
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "/";

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen?.(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150 ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span className={isActive ? "text-white" : "text-slate-500"}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Profile Info */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 text-white font-semibold text-xs">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-900 truncate">
              Admin User
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              admin@employeehub.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}