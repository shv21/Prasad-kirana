import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Phone, Clock, ExternalLink, User, Landmark } from 'lucide-react';

export const StoreInfo: React.FC = () => {
  const { settings } = useStore();

  return (
    <section id="store-info-section" className="py-12 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-700 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider">
                Store Location & Landmark
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                About {settings.shopName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                {settings.aboutText}
              </p>
            </div>

            {/* Shop Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Landmark Box */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-200">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-white text-xs">Nearby Landmark</h4>
                  <p className="font-extrabold text-amber-300 text-xs mt-0.5">
                    Near ZP School Pachod Kh.
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    (झेड.पी. शाळा पाचोड खुर्द जवळ)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <User className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Proprietor</h4>
                  <p className="text-slate-300 mt-0.5">{settings.proprietorName}</p>
                  <p className="text-emerald-400 text-[11px] font-bold">Mob: {settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <Landmark className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Accurate Address</h4>
                  <p className="text-slate-300 mt-0.5">
                    Pachod Kh., Taluka Paithan, Dist. Chhatrapati Sambhajinagar, Maharashtra 431121
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Opening Hours</h4>
                  <p className="text-slate-300 mt-0.5">{settings.openingHours}</p>
                </div>
              </div>

            </div>

            {/* Quick Action CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store: {settings.phone}</span>
              </a>

              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <ExternalLink className="w-4 h-4 text-slate-950" />
                <span>Open Google Maps Location</span>
              </a>
            </div>

          </div>

          {/* Map Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex-1 min-h-[280px] relative shadow-inner">
              <iframe
                title="Prasad Kirana Store Location Map Pachod Kh"
                src="https://maps.google.com/maps?q=19.582365,75.631613&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[280px] border-0"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/95 backdrop-blur-md p-3 rounded-xl text-xs shadow-lg border border-slate-700 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-amber-400">📍 Pachod Kh., Maharashtra 431121</p>
                  <p className="text-[11px] text-slate-300 font-bold">Near ZP School Pachod Kh.</p>
                </div>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black px-3 py-1.5 rounded-lg transition-colors shadow-xs shrink-0 ml-2"
                >
                  Directions
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
