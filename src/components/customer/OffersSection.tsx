import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { Tag, Sparkles, ShoppingBag } from 'lucide-react';

export const OffersSection: React.FC = () => {
  const { offers, products } = useStore();
  const { addToCart } = useCart();

  const discountedProducts = products.filter(
    (p) => p.discountPercent && p.discountPercent > 0
  );

  const activeOffers = offers.filter((o) => o.isActive);

  if (activeOffers.length === 0 && discountedProducts.length === 0) return null;

  return (
    <section id="offers-section" className="py-10 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-xs font-bold mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Special Savings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Today's Special Kirana Deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Handpicked everyday savings on Atta, Oils, Spices & Household Groceries
            </p>
          </div>
        </div>

        {/* Promotional Banners Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className={`p-6 rounded-2xl bg-gradient-to-br ${offer.bannerColor} text-white shadow-lg relative overflow-hidden flex flex-col justify-between group border border-white/10`}
            >
              <div className="relative z-10 space-y-2">
                <span className="inline-block bg-white/20 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider">
                  {offer.discountText}
                </span>
                <h3 className="text-lg font-bold leading-tight">{offer.title}</h3>
                <p className="text-xs text-white/90 leading-relaxed">{offer.subtitle}</p>
              </div>

              {offer.code && (
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                  <span className="text-[10px] text-white/80 font-medium">Use Code:</span>
                  <span className="bg-black/30 text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded border border-amber-300/40">
                    {offer.code}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlighted Discount Products Row */}
        {discountedProducts.length > 0 && (
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Top Discounted Products
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {discountedProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-800 rounded-xl p-3 border border-slate-700 hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-24 mb-2 bg-slate-900 rounded-lg p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1 left-1 bg-amber-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                        {product.discountPercent}% OFF
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">{product.weight}</p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-700/80 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400">₹{product.price}</span>
                      <span className="text-[10px] text-slate-500 line-through ml-1">₹{product.mrp}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
