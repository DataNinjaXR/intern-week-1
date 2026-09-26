"use client";

interface HeaderProps {
  title: string;
  subtitle: string;
  onMobileMenuOpen?: () => void;
}

export default function Header({ title, subtitle, onMobileMenuOpen }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 md:px-8">
      <div className="flex items-center gap-4">
        {onMobileMenuOpen && (
          <button
            onClick={onMobileMenuOpen}
            className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}
