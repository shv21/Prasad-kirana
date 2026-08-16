import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, MessageSquare, ShieldCheck, Truck, Clock, Store } from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings } = useStore();

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRashanList = () => {
    const el = document.getElementById('quick-rashan-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-850 to-slate-900 text-white py-8 md:py-12 border-b border-emerald-800">
      
      {/* Decorative store pattern */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-4 md:space-y-6 text-center lg:text-left">
            
            {/* Store Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs shadow-md">
              <Store className="w-4 h-4 text-slate-950" />
              <span>१. CSP बँगकिंग | २. किराणा दुकान | ३. अट्टा चक्की</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {settings.shopName}{' '}
              <span className="text-amber-400 font-extrabold block text-lg sm:text-2xl mt-1">
                ३ स्वतंत्र सेवा — झेड.पी. शाळा पाचोड खुर्द जवळ
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              १. ग्राहक सेवा केंद्र (CSP Banking AEPS/ATM), २. संपूर्ण घरगुती किराणा सामान (Grocery Store), ३. धान्य दळण अट्टा चक्की (Atta Chakki).
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToProducts}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg transition-all transform active:scale-95 text-xs sm:text-sm"
              >
                <ShoppingCart className="w-5 h-5 text-slate-950" />
                <span>किराणा सामान पहा (Shop Products)</span>
              </button>

              <button
                onClick={scrollToRashanList}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg transition-all transform active:scale-95 text-xs sm:text-sm"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>📋 व्हाट्सॲप लिस्ट पाठवा</span>
              </button>
            </div>

            {/* Trust Highlights Row */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-emerald-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-800 text-amber-300 rounded-lg shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">फास्ट होम डिलिव्हरी</p>
                  <p className="text-[10px] text-emerald-200">₹{settings.freeDeliveryMin} वर मोफत</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-800 text-amber-300 rounded-lg shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">साताही दिवस उघडे</p>
                  <p className="text-[10px] text-emerald-200">{settings.openingHours.split('(')[0]}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-800 text-amber-300 rounded-lg shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white">योग्य व रास्त भाव</p>
                  <p className="text-[10px] text-emerald-200">100% ओरिजनल</p>
                </div>
              </div>
            </div>

          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-700 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
                alt="Prasad Kirana Grocery Store Pachod"
                className="w-full h-56 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-emerald-600/50 flex items-center justify-between text-xs">
                <div>
                  <p className="font-extrabold text-amber-400">📍 पाचोड मेन मार्केट (पैठण)</p>
                  <p className="text-[11px] text-slate-300">प्रोप्रायटर: {settings.proprietorName}</p>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  className="bg-emerald-600 text-white font-black text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  📞 {settings.phone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
