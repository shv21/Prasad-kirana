import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { Sparkles, MessageSquare, Check } from 'lucide-react';

export const FlourMillSection: React.FC = () => {
  const { settings, setSelectedCategory } = useStore();
  const { generateWhatsAppOrderUrl } = useCart();

  return (
    <section id="flour-mill-section" className="py-10 bg-gradient-to-b from-amber-50/60 to-orange-50/40 border-b border-amber-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-200/80 relative overflow-hidden">
          
          {/* Top Decorative Banner */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-600 text-slate-900 font-extrabold text-xs px-4 py-1.5 rounded-bl-2xl shadow-sm uppercase tracking-wider">
            Atta Chakki (अट्टा चक्की)
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Pure Hygienic Grain Milling Services</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Fresh Chakki Atta & Grain Grinding at{' '}
                <span className="text-amber-700">Atta Chakki (अट्टा चक्की)</span>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {settings.flourMillInfo}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>100% Pure Lokwan Wheat</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Shalu Jowar & Bajra Peeth</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Chana Dal Pure Besan</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Custom Milling Requests</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => {
                    setSelectedCategory('cat-1');
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm"
                >
                  View Milled Atta Products
                </button>
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Order Custom Grain Milling
                </a>
              </div>
            </div>

            {/* Flour Mill Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-amber-100 bg-amber-950">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
                  alt="CSP Flour Mill Fresh Atta"
                  className="w-full h-64 object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase">
                    Pachod Local Mill
                  </span>
                  <h4 className="text-white text-lg font-bold">
                    Atta Chakki (अट्टा चक्की) — Proprietor: Abhimanyu Jadhav
                  </h4>
                  <p className="text-slate-300 text-xs mt-1">
                    Order pre-ground 5kg / 10kg bags or request custom milling.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
