import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';
import { useStore } from './StoreContext';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  itemCount: number;
  generateWhatsAppOrderUrl: (customerDetails?: {
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    deliveryType: 'delivery' | 'pickup';
    notes?: string;
  }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'prasad_kirana_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, addToast } = useStore();
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stockStatus === 'out_of_stock') {
      addToast(`"${product.name}" is currently out of stock`, 'warning');
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    addToast(`✓ Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal === 0 || subtotal >= settings.freeDeliveryMin
      ? 0
      : settings.deliveryFee;

  const totalAmount = subtotal + deliveryCharge;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Generate clean WhatsApp pre-filled message URL
  const generateWhatsAppOrderUrl = (customerDetails?: {
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    deliveryType: 'delivery' | 'pickup';
    notes?: string;
  }) => {
    const cleanPhone = settings.whatsappNumber.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    let message = `🛒 *NEW ORDER - ${settings.shopName}*\n`;
    message += `-------------------------------\n`;

    cart.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `${index + 1}. *${item.product.name}* (${item.product.weight})\n`;
      message += `   Qty: ${item.quantity} × ₹${item.product.price} = ₹${itemSubtotal}\n`;
    });

    message += `-------------------------------\n`;
    message += `📦 *Subtotal:* ₹${subtotal}\n`;
    if (deliveryCharge > 0) {
      message += `🚚 *Delivery Charge:* ₹${deliveryCharge}\n`;
    } else {
      message += `🚚 *Delivery:* FREE\n`;
    }
    message += `💰 *Total Amount:* ₹${totalAmount}\n`;
    message += `-------------------------------\n`;

    if (customerDetails) {
      message += `👤 *Customer Details:*\n`;
      message += `• Name: ${customerDetails.name}\n`;
      message += `• Mobile: ${customerDetails.phone}\n`;
      message += `• Type: ${customerDetails.deliveryType === 'delivery' ? 'Home Delivery 🚚' : 'Store Pickup 🏪'}\n`;
      if (customerDetails.deliveryType === 'delivery') {
        message += `• Address: ${customerDetails.address}\n`;
        if (customerDetails.landmark) {
          message += `• Landmark: ${customerDetails.landmark}\n`;
        }
      }
      if (customerDetails.notes) {
        message += `• Notes: ${customerDetails.notes}\n`;
      }
    } else {
      message += `Please confirm availability & delivery time. Thank you!`;
    }

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phoneWithCountry}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isCheckoutOpen,
        setIsCartOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryCharge,
        totalAmount,
        itemCount,
        generateWhatsAppOrderUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
