export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  brand: string;
  weight: string; // e.g., "1 kg", "500 g", "5 L"
  price: number;
  mrp: number; // Original Price
  categoryId: string;
  categoryName: string;
  stockStatus: StockStatus;
  stockCount: number;
  isPopular: boolean;
  isOffer: boolean;
  discountPercent?: number;
  description?: string;
  image: string;
  isFlourMillSpecial?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // Lucide icon identifier
  image?: string;
  description?: string;
  itemCount?: number;
  displayOrder: number;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  discountText: string;
  code?: string;
  bannerColor: string; // Tailind gradient/bg class
  imageUrl?: string;
  categoryId?: string;
  productId?: string;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'new' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type DeliveryType = 'delivery' | 'pickup';
export type PaymentType = 'cod' | 'upi' | 'store';

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g., "PKS-1001"
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  deliveryType: DeliveryType;
  paymentType: PaymentType;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface StoreSettings {
  shopName: string;
  proprietorName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  openingHours: string;
  deliveryFee: number;
  freeDeliveryMin: number;
  minOrderAmount: number;
  deliveryRadius: string;
  googleMapsUrl: string;
  aboutText: string;
  flourMillInfo: string;
  cspServicesInfo: string;
  announcementBar: string;
  heroImageUrl?: string;
  flourMillImageUrl?: string;
  adminPin?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
}
