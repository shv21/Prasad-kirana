import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';
import { X, Truck, Store, MessageSquare, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { settings, createOrder } = useStore();
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryCharge,
    totalAmount,
    clearCart,
    generateWhatsAppOrderUrl
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentType, setPaymentType] = useState<'cod' | 'upi' | 'store'>('cod');
  const [notes, setNotes] = useState('');
  
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      alert('Please provide your name and mobile number.');
      return;
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      alert('Please enter your delivery address.');
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      brand: item.product.brand,
      weight: item.product.weight,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));

    const newOrder = createOrder({
      customerName,
      phone,
      address: deliveryType === 'delivery' ? address : settings.address,
      landmark,
      deliveryType,
      paymentType,
      notes,
      items: orderItems,
      subtotal,
      deliveryCharge: deliveryType === 'delivery' ? deliveryCharge : 0,
      totalAmount: deliveryType === 'delivery' ? totalAmount : subtotal
    });

    // Fire confetti celebrating order!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Ignore if confetti script fails
    }

    setPlacedOrder(newOrder);
    clearCart();
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 animate-pop-in">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg">Quick Checkout</h3>
            <p className="text-xs text-emerald-200">
              {placedOrder ? 'Order Placed Successfully!' : 'Enter your details to confirm your order'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <X className="w-5 h-5 text-emerald-100" />
          </button>
        </div>

        {/* Order Confirmation Screen */}
        {placedOrder ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-mono font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                Order ID: {placedOrder.orderNumber}
              </span>
              <h4 className="text-xl font-extrabold text-slate-900 mt-2">
                Thank you, {placedOrder.customerName}!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Your order of <strong className="text-slate-900">₹{placedOrder.totalAmount}</strong> has been received by <strong className="text-slate-900">{settings.shopName}</strong>.
              </p>
            </div>

            {/* Delivery/Pickup Details Box */}
            <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Fulfillment Type:</span>
                <span className="font-bold text-slate-900">
                  {placedOrder.deliveryType === 'delivery' ? 'Home Delivery 🚚' : 'Store Pickup 🏪'}
                </span>
              </div>
              {placedOrder.deliveryType === 'delivery' ? (
                <p className="text-slate-700">
                  <strong className="text-slate-900">Address:</strong> {placedOrder.address}
                  {placedOrder.landmark && ` (Landmark: ${placedOrder.landmark})`}
                </p>
              ) : (
                <p className="text-slate-700">
                  <strong className="text-slate-900">Pickup Location:</strong> {settings.address}
                </p>
              )}
              <p className="text-slate-700">
                <strong className="text-slate-900">Phone:</strong> {placedOrder.phone}
              </p>
            </div>

            {/* Send via WhatsApp Button */}
            <div className="space-y-2">
              <a
                href={generateWhatsAppOrderUrl({
                  name: placedOrder.customerName,
                  phone: placedOrder.phone,
                  address: placedOrder.address,
                  landmark: placedOrder.landmark,
                  deliveryType: placedOrder.deliveryType,
                  notes: placedOrder.notes
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                Send Order Confirmation on WhatsApp
              </a>

              <button
                onClick={handleClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs"
              >
                Back to Shop
              </button>
            </div>

          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-4 sm:p-6 space-y-4">
            
            {/* Delivery vs Store Pickup Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Truck className="w-4 h-4" />
                Home Delivery
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-4 h-4" />
                Store Pickup
              </button>
            </div>

            {/* Pickup Info Banner if pickup selected */}
            {deliveryType === 'pickup' && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Store Pickup Location:</p>
                  <p>{settings.address} ({settings.openingHours})</p>
                </div>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Patil"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9822145890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {deliveryType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House no, Colony, Pachod Gaon..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nearby Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Opp. Water Tank / Near Gram Panchayat"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="cod">Cash on Delivery / Pickup</option>
                  <option value="upi">GPay / PhonePe / PayTM (UPI on Delivery)</option>
                  <option value="store">Pay at Store</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Special Order Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver after 5 PM, fine flour required..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Total Amount Summary */}
            <div className="bg-slate-100 p-3.5 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-600 block">Total Payable:</span>
                <span className="text-lg font-extrabold text-emerald-700">
                  ₹{deliveryType === 'delivery' ? totalAmount : subtotal}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                {deliveryType === 'delivery' && deliveryCharge === 0 ? '🎉 Free Delivery' : ''}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Placing Order...' : 'Confirm Order & Place Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
