import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { Home, LayoutGrid, FileText, ShoppingBag, MessageSquare } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { setSelectedCategory } = useStore();
  const { itemCount, setIsCartOpen, generateWhatsAppOrderUrl } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl px-2 py-1.5 flex items-center justify-around text-center">
      
      {/* Home */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-600 transition-colors w-1/5"
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Home</span>
      </button>

      {/* Categories */}
      <button
        onClick={() => {
          setSelectedCategory('all');
          scrollTo('categories-section');
        }}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-600 transition-colors w-1/5"
      >
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Categories</span>
      </button>

      {/* Rashan List */}
      <button
        onClick={() => scrollTo('quick-rashan-section')}
        className="flex flex-col items-center justify-center p-1 text-amber-700 hover:text-amber-800 transition-colors w-1/5 font-bold"
      >
        <FileText className="w-5 h-5 text-amber-600" />
        <span className="text-[10px] font-bold mt-0.5">Rashan List</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-600 transition-colors w-1/5"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-900 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium mt-0.5">Cart</span>
      </button>

      {/* WhatsApp Quick Order */}
      <a
        href={generateWhatsAppOrderUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-1 text-emerald-600 hover:text-emerald-700 transition-colors w-1/5"
      >
        <MessageSquare className="w-5 h-5 fill-emerald-100" />
        <span className="text-[10px] font-bold mt-0.5 text-emerald-700">WhatsApp</span>
      </a>

    </div>
  );
};
