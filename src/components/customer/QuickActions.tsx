import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Landmark, ShoppingBag, Wheat, MapPin } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { settings } = useStore();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-6 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Action 1: CSP Banking Services */}
          <button
            onClick={() => scrollTo('three-services-section')}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-blue-950/80 hover:bg-blue-900/90 border border-blue-700/60 transition-all text-left group shadow-sm cursor-pointer active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                🏦 CSP Banking
              </h3>
              <p className="text-[11px] text-blue-200 hidden sm:block mt-0.5">
                AEPS, ATM, Cash Deposit
              </p>
            </div>
          </button>

          {/* Action 2: Shop Groceries */}
          <button
            onClick={() => scrollTo('products-section')}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/60 transition-all text-left group shadow-sm cursor-pointer active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                🛒 Grocery Store
              </h3>
              <p className="text-[11px] text-emerald-200 hidden sm:block mt-0.5">
                Atta, Rice, Oils, Soaps
              </p>
            </div>
          </button>

          {/* Action 3: Flour Mill Services */}
          <button
            onClick={() => scrollTo('flour-mill-section')}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-amber-950/80 hover:bg-amber-900/90 border border-amber-700/60 transition-all text-left group shadow-sm cursor-pointer active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <Wheat className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                🌾 Flour Mill (अट्टा चक्की)
              </h3>
              <p className="text-[11px] text-amber-200 hidden sm:block mt-0.5">
                Grain milling & fresh bags
              </p>
            </div>
          </button>

          {/* Action 4: Location Landmark */}
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 transition-all text-left group shadow-sm active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">
                📍 Store Landmark
              </h3>
              <p className="text-[11px] text-slate-300 hidden sm:block mt-0.5 truncate">
                Near ZP School Pachod Kh.
              </p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};
