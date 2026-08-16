import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, MessageSquare, PhoneCall, MapPin } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { settings } = useStore();
  const { generateWhatsAppOrderUrl } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-6 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Action 1: Shop Products */}
          <button
            onClick={() => scrollTo('products-section')}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all text-left group shadow-2xs active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Shop Products
              </h3>
              <p className="text-[11px] text-slate-600 hidden sm:block mt-0.5">
                Browse 100+ kirana items
              </p>
            </div>
          </button>

          {/* Action 2: Order on WhatsApp */}
          <a
            href={generateWhatsAppOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-all text-left group shadow-2xs active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Order on WhatsApp
              </h3>
              <p className="text-[11px] text-slate-600 hidden sm:block mt-0.5">
                Instant list order sending
              </p>
            </div>
          </a>

          {/* Action 3: Call Store */}
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-all text-left group shadow-2xs active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Call Store
              </h3>
              <p className="text-[11px] text-slate-600 hidden sm:block mt-0.5">
                {settings.phone}
              </p>
            </div>
          </a>

          {/* Action 4: Get Directions */}
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-all text-left group shadow-2xs active:scale-98"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Get Directions
              </h3>
              <p className="text-[11px] text-slate-600 hidden sm:block mt-0.5">
                Pachod, Paithan
              </p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};
