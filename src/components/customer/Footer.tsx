import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { Phone, MessageSquare, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdminLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLogin }) => {
  const { settings, categories, setSelectedCategory, isAdminLoggedIn, setViewMode } = useStore();
  const { generateWhatsAppOrderUrl } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Shop Branding & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center text-lg shadow-md">
                PK
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  {settings.shopName}
                </h3>
                <p className="text-amber-400 text-xs font-semibold">
                  CSP Flour Mill Pachod
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted neighborhood Kirana & Flour Mill store. Fresh daily groceries, packaged foods, and grain milling served with care in Pachod.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Guaranteed Fresh & Fair Prices</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('categories-section')} className="hover:text-emerald-400 transition-colors">
                  Product Categories
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('products-section')} className="hover:text-emerald-400 transition-colors">
                  All Kirana Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('flour-mill-section')} className="hover:text-emerald-400 transition-colors text-amber-400">
                  🌾 CSP Flour Mill Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('offers-section')} className="hover:text-emerald-400 transition-colors">
                  Today's Savings & Offers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('store-info-section')} className="hover:text-emerald-400 transition-colors">
                  Store Location & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c.id);
                      scrollTo('products-section');
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Store Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}, {settings.state}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:underline font-bold text-white">
                  {settings.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-400 font-semibold"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </p>
              <p className="text-slate-400 text-[11px] pt-1">
                <strong>Hours:</strong> {settings.openingHours}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.shopName}. All rights reserved. Proprietor: {settings.proprietorName}.</p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setViewMode('admin');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className="hover:text-emerald-400 transition-colors text-[11px] underline"
            >
              Shop Owner Admin Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
