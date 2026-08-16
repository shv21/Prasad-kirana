import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, User, Lock, X, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin, settings } = useStore();
  const [username, setUsername] = useState(settings.adminUsername || 'abhimanyu');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(username, password);
    if (success) {
      setPassword('');
      onClose();
    } else {
      setErrorMsg(`Incorrect Username or Password! (Default ID: "${settings.adminUsername || 'abhimanyu'}", Password: "${settings.adminPassword || 'abhimanyu.jadhav'}")`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-pop-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Shopkeeper Admin Login</h3>
              <p className="text-xs text-slate-400">Prasad Kirana Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Enter your admin username (ID) & password to access inventory, orders, offers, and store settings.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Username / ID *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                autoFocus
                placeholder="e.g. abhimanyu"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter password (abhimanyu.jadhav)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errorMsg && (
              <p className="text-xs font-semibold text-red-600 mt-1.5">{errorMsg}</p>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-950 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-bold">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Admin Credentials:</span>
            </div>
            <p className="text-[11px] text-slate-700 ml-5.5">
              ID: <strong className="font-mono bg-amber-200/80 px-1 py-0.5 rounded">{settings.adminUsername || 'abhimanyu'}</strong> | Password: <strong className="font-mono bg-amber-200/80 px-1 py-0.5 rounded">{settings.adminPassword || 'abhimanyu.jadhav'}</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-98"
          >
            Login to Admin Panel
          </button>
        </form>

      </div>
    </div>
  );
};
