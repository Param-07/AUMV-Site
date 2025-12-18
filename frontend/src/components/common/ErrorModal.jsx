import React from "react";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";

export default function ErrorModal({ 
  type = "error", 
  title, 
  message, 
  onClose 
}) {
  const theme = {
    error: {
      icon: <XCircle size={48} className="text-red-500" />,
      badge: "bg-red-100 text-red-700 border-red-300",
      gradient: "from-red-600 to-red-500",
      ring: "ring-red-400/30"
    },
    warning: {
      icon: <AlertTriangle size={48} className="text-yellow-500" />,
      badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
      gradient: "from-yellow-500 to-yellow-400",
      ring: "ring-yellow-400/30"
    },
    success: {
      icon: <CheckCircle size={48} className="text-green-500" />,
      badge: "bg-green-100 text-green-700 border-green-300",
      gradient: "from-green-600 to-green-500",
      ring: "ring-green-400/30"
    },
  }[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`w-[90%] max-w-md bg-white/95 border border-slate-200 rounded-2xl shadow-2xl px-7 py-6 ring-1 ${theme.ring}`}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-white shadow-lg p-3">
            {theme.icon}
          </div>

          <span
            className={`px-4 py-1 text-[11px] font-semibold rounded-full border tracking-wide ${theme.badge}`}
          >
            SCHOOL NOTICE
          </span>

          <h2 className="text-[20px] font-bold text-slate-800 tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-slate-600 leading-relaxed text-sm">
            {message}
          </p>

          <button
            onClick={onClose}
            className={`mt-2 w-full py-2.5 rounded-lg font-semibold text-white text-sm shadow-md transition active:scale-95 bg-gradient-to-r ${theme.gradient}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}