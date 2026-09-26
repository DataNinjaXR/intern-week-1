"use client";

interface DeleteModalProps {
  isOpen: boolean;
  employeeName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export default function DeleteModal({
  isOpen,
  employeeName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 text-center">Confirm Deletion</h3>
        <p className="mt-2 text-sm text-slate-500 text-center">
          Are you sure you want to delete <span className="font-semibold text-slate-900">{employeeName}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="w-1/2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-1/2 rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
