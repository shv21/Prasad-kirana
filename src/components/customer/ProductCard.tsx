import React from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = product.stockStatus === 'out_of_stock' || product.stockCount <= 0;
  const isLowStock = product.stockStatus === 'low_stock' || (product.stockCount > 0 && product.stockCount <= 5);

  const savings = product.mrp > product.price ? product.mrp - product.price : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group relative p-2.5 sm:p-3.5">
      
      {/* Top Badges */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between gap-1 pointer-events-none">
        {product.discountPercent && product.discountPercent > 0 ? (
          <span className="bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md shadow-2xs uppercase">
            {product.discountPercent}% OFF
          </span>
        ) : product.isPopular ? (
          <span className="bg-emerald-700 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-md shadow-2xs">
            POPULAR
          </span>
        ) : <div />}

        {product.isFlourMillSpecial && (
          <span className="bg-amber-100 text-amber-950 border border-amber-300 font-bold text-[9px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-2xs">
            <Sparkles className="w-2.5 h-2.5 text-amber-600 shrink-0" />
            Mill Fresh
          </span>
        )}
      </div>

      {/* Image Area */}
      <div className="relative pt-2 pb-1 bg-slate-50 rounded-lg flex items-center justify-center h-32 sm:h-40 overflow-hidden mb-2">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full max-h-28 sm:max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-250 ${
            isOutOfStock ? 'grayscale opacity-50' : ''
          }`}
          loading="lazy"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Weight Pill */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
            <span className="font-extrabold uppercase text-emerald-800 tracking-wider truncate max-w-[50%]">
              {product.brand}
            </span>
            <span className="bg-slate-100 text-slate-800 font-bold px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
              {product.weight}
            </span>
          </div>

          {/* Name */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 min-h-[2.2rem]" title={product.name}>
            {product.name}
          </h3>
        </div>

        {/* Low Stock Banner */}
        {isLowStock && !isOutOfStock && (
          <p className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80 inline-block">
            Only {product.stockCount} left!
          </p>
        )}

        {/* Price & Add to Cart Controls */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-1">
          
          {/* Price Block */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-slate-900">
                ₹{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-[11px] text-slate-400 line-through">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-[9px] font-extrabold text-emerald-700">
                Save ₹{savings}
              </p>
            )}
          </div>

          {/* Add / Quantity Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center bg-emerald-700 text-white rounded-lg overflow-hidden shadow-xs">
              <button
                onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                className="px-1.5 py-1 hover:bg-emerald-800 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-1.5 text-xs font-black min-w-[18px] text-center">
                {quantityInCart}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                disabled={quantityInCart >= product.stockCount}
                className="px-1.5 py-1 hover:bg-emerald-800 transition-colors disabled:opacity-50"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs active:scale-95 ${
                isOutOfStock
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
