import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070e20]/95 backdrop-blur-md shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300"
        >
          <div className="mt-0.5 shrink-0">
            {t.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            {t.type === "warning" && <AlertCircle className="w-4 h-4 text-amber-500" />}
            {t.type === "info" && <Info className="w-4 h-4 text-cyan-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-snug">
              {t.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5 shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
