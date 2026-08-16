import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none md:bottom-6">
      {toasts.map((toast) => {
        let bg = 'bg-slate-900 text-white border-slate-700';
        let Icon = CheckCircle2;

        if (toast.type === 'success') {
          bg = 'bg-emerald-800 text-emerald-50 border-emerald-700';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-800 text-amber-50 border-amber-700';
          Icon = AlertCircle;
        } else if (toast.type === 'error') {
          bg = 'bg-red-800 text-red-50 border-red-700';
          Icon = XCircle;
        } else if (toast.type === 'info') {
          bg = 'bg-blue-800 text-blue-50 border-blue-700';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg animate-slide-up text-sm font-medium ${bg}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 shrink-0" />
              <span>{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/20 transition-colors ml-2"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
