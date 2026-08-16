import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquare, ArrowRight, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { settings } = useStore();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryCharge,
    totalAmount,
    itemCount,
    generateWhatsAppOrderUrl
  } = useCart();

  if (!isCartOpen) return null;

  const amountForFreeDelivery = Math.max(0, settings.freeDeliveryMin - subtotal);
  const freeDeliveryPercent = Math.min(100, (subtotal / settings.freeDeliveryMin) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-up">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-emerald-800 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-300" />
              <h3 className="text-base sm:text-lg font-bold">Shopping Cart</h3>
              <span className="bg-emerald-700 text-emerald-100 text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <X className="w-5 h-5 text-emerald-100" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100">
            {amountForFreeDelivery > 0 ? (
              <div>
                <p className="text-xs text-emerald-900 font-medium flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Add <strong className="font-bold text-emerald-700">₹{amountForFreeDelivery}</strong> more for <strong>FREE Home Delivery</strong>!
                </p>
                <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${freeDeliveryPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                🎉 Congratulations! You have unlocked <strong>FREE Home Delivery</strong>!
              </p>
            )}
          </div>

          {/* Cart Item Listing */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {cart.length > 0 ? (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {product.weight} • ₹{product.price}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity control */}
                      <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-slate-700" />
                        </button>
                        <span className="px-2.5 font-bold text-slate-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stockCount}
                          className="px-2 py-0.5 hover:bg-slate-100 transition-colors disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3 text-slate-700" />
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">
                          ₹{product.price * quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-red-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Add items from Atta, Rice, Dal, Oils or Snacks to begin your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span className="font-semibold text-slate-900">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-emerald-700 text-base">₹{totalAmount}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {/* Order on WhatsApp */}
                <a
                  href={generateWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-3 rounded-xl text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Order on WhatsApp
                </a>

                {/* Web Checkout */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-3 rounded-xl text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Proceed Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                <span>✓ Pay Cash / UPI on delivery</span>
                <button onClick={clearCart} className="hover:underline text-slate-400">
                  Clear Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
