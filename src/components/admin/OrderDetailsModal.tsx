import React from 'react';
import { useStore } from '../../context/StoreContext';
import type { Order, OrderStatus } from '../../types';
import { X, Phone, MessageSquare } from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const statusOptions: { id: OrderStatus; label: string; bg: string; text: string }[] = [
  { id: 'new', label: 'New Order', bg: 'bg-blue-100', text: 'text-blue-800' },
  { id: 'confirmed', label: 'Confirmed', bg: 'bg-indigo-100', text: 'text-indigo-800' },
  { id: 'preparing', label: 'Preparing Grains / Items', bg: 'bg-amber-100', text: 'text-amber-800' },
  { id: 'ready', label: 'Ready for Pickup / Dispatch', bg: 'bg-purple-100', text: 'text-purple-800' },
  { id: 'out_for_delivery', label: 'Out for Delivery', bg: 'bg-orange-100', text: 'text-orange-800' },
  { id: 'delivered', label: 'Delivered', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  { id: 'cancelled', label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-800' }
];

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
  order
}) => {
  const { updateOrderStatus, settings } = useStore();

  if (!isOpen || !order) return null;

  const currentStatusObj = statusOptions.find((s) => s.id === order.status) || statusOptions[0];

  const handleWhatsAppContact = () => {
    const cleanPhone = order.phone.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const text = encodeURIComponent(
      `Hello ${order.customerName}, regarding your Order #${order.orderNumber} from ${settings.shopName}...`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 animate-pop-in">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-amber-400 text-sm">
                #{order.orderNumber}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentStatusObj.bg} ${currentStatusObj.text}`}>
                {currentStatusObj.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Status Changer Bar */}
          <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Update Order Status:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {statusOptions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateOrderStatus(order.id, s.id)}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                    order.status === s.id
                      ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {s.label.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Details Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{order.customerName}</h4>
                <p className="text-slate-500 font-mono mt-0.5">📞 {order.phone}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${order.phone}`}
                  className="p-2 bg-emerald-100 text-emerald-800 rounded-xl hover:bg-emerald-200"
                  title="Call Customer"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={handleWhatsAppContact}
                  className="p-2 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
              <div>
                <span className="text-slate-400 font-medium block">Type:</span>
                <span className="font-bold text-slate-900">
                  {order.deliveryType === 'delivery' ? 'Home Delivery 🚚' : 'Store Pickup 🏪'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Payment Mode:</span>
                <span className="font-bold uppercase text-emerald-700">{order.paymentType}</span>
              </div>
            </div>

            {order.deliveryType === 'delivery' && (
              <div className="pt-2 border-t border-slate-200 text-slate-700">
                <span className="text-slate-400 font-medium block">Delivery Address:</span>
                <p className="font-medium text-slate-900 mt-0.5">{order.address}</p>
                {order.landmark && (
                  <p className="text-slate-500 text-[11px]">Landmark: {order.landmark}</p>
                )}
              </div>
            )}

            {order.notes && (
              <div className="pt-1 text-amber-900 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200">
                <strong>Customer Note:</strong> {order.notes}
              </div>
            )}
          </div>

          {/* Itemized Products Listing */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Ordered Items ({order.items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
            
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-contain bg-white rounded-lg p-1 border border-slate-200"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900">{item.name}</h5>
                      <p className="text-slate-500 text-[11px]">{item.weight} • ₹{item.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 block">
                      Qty: {item.quantity}
                    </span>
                    <span className="text-emerald-700 font-extrabold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Subtotal:</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee:</span>
              <span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-amber-400 pt-2 border-t border-slate-800">
              <span>Total Order Amount:</span>
              <span className="text-base">₹{order.totalAmount}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
