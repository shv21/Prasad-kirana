import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { MapPin, Phone, MessageSquare, Clock, Truck, ExternalLink, User } from 'lucide-react';

export const StoreInfo: React.FC = () => {
  const { settings } = useStore();
  const { generateWhatsAppOrderUrl } = useCart();

  return (
    <section id="store-info-section" className="py-12 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                Visit & Contact Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                About {settings.shopName}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mt-1">
                {settings.aboutText}
              </p>
            </div>

            {/* Shop Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <User className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Proprietor</h4>
                  <p className="text-slate-600 mt-0.5">{settings.proprietorName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Shop Address</h4>
                  <p className="text-slate-600 mt-0.5">
                    {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                  </p>
                  <p className="text-slate-500 text-[11px]">Landmark: {settings.landmark}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Opening Timings</h4>
                  <p className="text-slate-600 mt-0.5">{settings.openingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Delivery Coverage</h4>
                  <p className="text-slate-600 mt-0.5">{settings.deliveryRadius}</p>
                  <p className="text-emerald-700 font-bold mt-0.5">
                    Free Delivery over ₹{settings.freeDeliveryMin}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action CTA Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                Call Store: {settings.phone}
              </a>
              <a
                href={generateWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Order on WhatsApp
              </a>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-colors border border-slate-200"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                Get Directions
              </a>
            </div>

          </div>

          {/* Map Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden flex-1 min-h-[260px] relative shadow-inner">
              <iframe
                title="Prasad Kirana Store Location Map"
                src="https://maps.google.com/maps?q=Pachod,Paithan,Maharashtra&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[260px] border-0"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-xs shadow-md border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">📍 Pachod Main Market</p>
                  <p className="text-[11px] text-slate-600">Taluka Paithan, Dist. Chhatrapati Sambhajinagar</p>
                </div>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Maps
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
