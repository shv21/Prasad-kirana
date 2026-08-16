import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Store, ShieldCheck, Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdminLogin }) => {
  const { settings, isAdminLoggedIn, viewMode, setViewMode } = useStore();
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo & Shop Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-md shadow-emerald-600/20 shrink-0">
              PK
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  {settings.shopName}
                </h1>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm border border-amber-300 hidden sm:inline-block">
                  3-in-1 Center
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {settings.tagline || 'Your Neighborhood Kirana Store'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-700">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('three-services-section')} className="hover:text-blue-600 transition-colors text-blue-700 font-bold">
              🏦 CSP Banking
            </button>
            <button onClick={() => scrollToSection('products-section')} className="hover:text-emerald-600 transition-colors text-emerald-700 font-bold">
              🛒 Kirana Store
            </button>
            <button onClick={() => scrollToSection('flour-mill-section')} className="hover:text-amber-700 transition-colors text-amber-800 font-bold">
              🌾 Atta Chakki
            </button>
            <button onClick={() => scrollToSection('store-info-section')} className="hover:text-emerald-600 transition-colors">
              📍 Landmark & Map
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Call Store Button (Quick Call) */}
            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
              title="Call Store"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Shop</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="bg-amber-400 text-slate-900 font-bold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {itemCount}
                </span>
              )}
              {subtotal > 0 && (
                <span className="hidden lg:inline text-xs opacity-90 border-l border-emerald-500 pl-2">
                  ₹{subtotal}
                </span>
              )}
            </button>

            {/* Admin Toggle / Login Button */}
            {isAdminLoggedIn ? (
              <button
                onClick={() => setViewMode(viewMode === 'admin' ? 'customer' : 'admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  viewMode === 'admin'
                    ? 'bg-amber-500 text-slate-900 hover:bg-amber-600'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {viewMode === 'admin' ? 'Customer Site' : 'Admin Panel'}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 rounded-xl transition-colors"
                title="Shopkeeper Admin Login"
              >
                <Store className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <button
            onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            🏠 Home
          </button>
          <button
            onClick={() => scrollToSection('categories-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            📦 Categories
          </button>
          <button
            onClick={() => scrollToSection('products-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            🛍️ All Products
          </button>
          <button
            onClick={() => scrollToSection('three-services-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100"
          >
            🏦 CSP Banking (ग्राहक सेवा केंद्र)
          </button>
          <button
            onClick={() => scrollToSection('products-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100"
          >
            🛒 Kirana Store (किराणा स्टोअर्स)
          </button>
          <button
            onClick={() => scrollToSection('flour-mill-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100"
          >
            🌾 Atta Chakki (अट्टा चक्की)
          </button>
          <button
            onClick={() => scrollToSection('offers-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            🏷️ Today's Offers
          </button>
          <button
            onClick={() => scrollToSection('store-info-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            📍 Store Location & Timings
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-emerald-700 py-2"
            >
              <Phone className="w-4 h-4" />
              Call {settings.phone}
            </a>
            {!isAdminLoggedIn && (
              <button
                onClick={() => { setIsMobileMenuOpen(false); onOpenAdminLogin(); }}
                className="text-xs text-slate-500 underline py-2"
              >
                Owner Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
