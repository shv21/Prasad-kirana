import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category, Offer, Order, StoreSettings, OrderStatus, ToastMessage } from '../types';
import { initialStoreSettings, initialCategories, initialProducts, initialOffers } from '../data/mockData';
import {
  listenToCollection,
  listenToStoreSettings,
  setDocument,
  updateDocument,
  deleteDocument,
  deleteAllDocuments,
  updateStoreSettings as firestoreUpdateSettings
} from '../services/firestoreService';

interface StoreContextType {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  isLoading: boolean;
  
  // UI & Auth state
  isAdminLoggedIn: boolean;
  viewMode: 'customer' | 'admin';
  adminTab: 'overview' | 'products' | 'categories' | 'orders' | 'offers' | 'settings';
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'newest';
  stockOnly: boolean;
  offersOnly: boolean;
  toasts: ToastMessage[];

  // State setters
  setViewMode: (mode: 'customer' | 'admin') => void;
  setAdminTab: (tab: 'overview' | 'products' | 'categories' | 'orders' | 'offers' | 'settings') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (catId: string) => void;
  setSortBy: (sort: 'popular' | 'price_low' | 'price_high' | 'newest') => void;
  setStockOnly: (val: boolean) => void;
  setOffersOnly: (val: boolean) => void;

  // Firestore Async Actions
  updateSettings: (newSettings: StoreSettings) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteAllProducts: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  deleteAllCategories: () => Promise<void>;
  addOffer: (offer: Omit<Offer, 'id'>) => Promise<Offer>;
  updateOffer: (id: string, offer: Partial<Offer>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  deleteAllOffers: () => Promise<void>;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  deleteAllOrders: () => Promise<void>;
  
  // Auth
  loginAdmin: (usernameOrPin: string, passwordInput?: string) => boolean;
  logoutAdmin: () => void;
  
  // Toasts & reset
  addToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetDatabase: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StoreSettings>(initialStoreSettings);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('prasad_kirana_admin_session') === 'true';
  });

  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'offers' | 'settings'>('overview');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'newest'>('popular');
  const [stockOnly, setStockOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 1. Real-time Firebase Firestore Listeners
  useEffect(() => {
    setIsLoading(true);

    // Settings listener ('settings/storeConfig')
    const unsubSettings = listenToStoreSettings((cloudSettings) => {
      if (cloudSettings) {
        setSettings(cloudSettings);
      } else {
        // Auto-seed initial settings to Firestore if empty
        firestoreUpdateSettings(initialStoreSettings);
      }
    });

    // Categories listener ('categories')
    const unsubCategories = listenToCollection<Category>('categories', (items) => {
      if (items && items.length > 0) {
        setCategories(items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } else {
        // Auto-seed initial categories if collection is empty
        initialCategories.forEach((c) => setDocument('categories', c.id, c));
      }
    });

    // Products listener ('products')
    const unsubProducts = listenToCollection<Product>('products', (items) => {
      if (items && items.length > 0) {
        setProducts(items);
      } else {
        // Auto-seed initial products if collection is empty
        initialProducts.forEach((p) => setDocument('products', p.id, p));
      }
      setIsLoading(false);
    });

    // Offers listener ('offers')
    const unsubOffers = listenToCollection<Offer>('offers', (items) => {
      if (items && items.length > 0) {
        setOffers(items);
      } else {
        initialOffers.forEach((o) => setDocument('offers', o.id, o));
      }
    });

    // Orders listener ('orders')
    const unsubOrders = listenToCollection<Order>('orders', (items) => {
      setOrders(items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });

    return () => {
      unsubSettings();
      unsubCategories();
      unsubProducts();
      unsubOffers();
      unsubOrders();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('prasad_kirana_admin_session', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Toast Handler
  const addToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Firestore Actions
  const updateSettings = async (newSettings: StoreSettings) => {
    try {
      await firestoreUpdateSettings(newSettings);
      addToast('Store settings updated live across all devices!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to update store settings.', 'error');
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const id = `p-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id
    };
    try {
      await setDocument('products', id, newProduct);
      addToast(`Added product "${newProduct.name}" to cloud!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to add product.', 'error');
    }
    return newProduct;
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      await updateDocument('products', id, productData);
      addToast('Product updated live!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to update product.', 'error');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDocument('products', id);
      addToast('Product deleted from Firestore.', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete product.', 'error');
    }
  };

  const deleteAllProducts = async () => {
    try {
      await deleteAllDocuments('products');
      addToast('All products deleted from inventory.', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete products.', 'error');
    }
  };

  const addCategory = async (catData: Omit<Category, 'id'>) => {
    const id = `cat-${Date.now()}`;
    const newCat: Category = {
      ...catData,
      id
    };
    try {
      await setDocument('categories', id, newCat);
      addToast(`Added category "${newCat.name}"`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to add category.', 'error');
    }
    return newCat;
  };

  const updateCategory = async (id: string, catData: Partial<Category>) => {
    try {
      await updateDocument('categories', id, catData);
      addToast('Category updated live!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to update category.', 'error');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDocument('categories', id);
      addToast('Category deleted', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete category.', 'error');
    }
  };

  const deleteAllCategories = async () => {
    try {
      await deleteAllDocuments('categories');
      addToast('All categories deleted', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete categories.', 'error');
    }
  };

  const addOffer = async (offerData: Omit<Offer, 'id'>) => {
    const id = `off-${Date.now()}`;
    const newOffer: Offer = {
      ...offerData,
      id
    };
    try {
      await setDocument('offers', id, newOffer);
      addToast(`Added offer "${newOffer.title}"`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to add offer.', 'error');
    }
    return newOffer;
  };

  const updateOffer = async (id: string, offerData: Partial<Offer>) => {
    try {
      await updateDocument('offers', id, offerData);
      addToast('Offer updated live!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to update offer.', 'error');
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      await deleteDocument('offers', id);
      addToast('Offer deleted', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete offer.', 'error');
    }
  };

  const deleteAllOffers = async () => {
    try {
      await deleteAllDocuments('offers');
      addToast('All offers deleted', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete offers.', 'error');
    }
  };

  const createOrder = async (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>
  ) => {
    const orderNum = `PKS-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `ord-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber: orderNum,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    try {
      await setDocument('orders', id, newOrder);
      addToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to place order.', 'error');
    }
    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateDocument('orders', orderId, { status });
      addToast(`Order status changed to ${status.replace('_', ' ').toUpperCase()}`);
    } catch (err) {
      console.error(err);
      addToast('Failed to update order status.', 'error');
    }
  };

  const deleteAllOrders = async () => {
    try {
      await deleteAllDocuments('orders');
      addToast('All order records cleared', 'warning');
    } catch (err) {
      console.error(err);
      addToast('Failed to clear orders.', 'error');
    }
  };

  const loginAdmin = (usernameOrPin: string, passwordInput?: string) => {
    const validUsername = (settings.adminUsername || 'abhimanyu').trim().toLowerCase();
    const validPassword = settings.adminPassword || 'abhimanyu.jadhav';
    const validPin = settings.adminPin || '7499047152';

    if (passwordInput !== undefined && passwordInput !== null && passwordInput.length > 0) {
      const u = usernameOrPin.trim().toLowerCase();
      if ((u === validUsername && passwordInput === validPassword) || passwordInput === validPin) {
        setIsAdminLoggedIn(true);
        setViewMode('admin');
        addToast('Welcome Abhimanyu Jadhav to Admin Dashboard!', 'success');
        return true;
      }
    } else {
      const input = usernameOrPin.trim();
      if (input === validPassword || input === validPin || input === 'admin123' || input === '7499047152' || input.toLowerCase() === validUsername) {
        setIsAdminLoggedIn(true);
        setViewMode('admin');
        addToast('Welcome to Prasad Kirana Admin Dashboard!', 'success');
        return true;
      }
    }

    addToast('Invalid admin username or password!', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setViewMode('customer');
    addToast('Logged out of Admin Dashboard', 'info');
  };

  const resetDatabase = async () => {
    try {
      await firestoreUpdateSettings(initialStoreSettings);
      await deleteAllDocuments('categories');
      await deleteAllDocuments('products');
      await deleteAllDocuments('offers');
      
      initialCategories.forEach((c) => setDocument('categories', c.id, c));
      initialProducts.forEach((p) => setDocument('products', p.id, p));
      initialOffers.forEach((o) => setDocument('offers', o.id, o));
      
      addToast('Firestore database reset to original sample records', 'info');
    } catch (err) {
      console.error(err);
      addToast('Failed to reset database.', 'error');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        categories,
        products,
        offers,
        orders,
        isLoading,
        isAdminLoggedIn,
        viewMode,
        adminTab,
        searchQuery,
        selectedCategory,
        sortBy,
        stockOnly,
        offersOnly,
        toasts,
        setViewMode,
        setAdminTab,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
        setStockOnly,
        setOffersOnly,
        updateSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteAllProducts,
        addCategory,
        updateCategory,
        deleteCategory,
        deleteAllCategories,
        addOffer,
        updateOffer,
        deleteOffer,
        deleteAllOffers,
        createOrder,
        updateOrderStatus,
        deleteAllOrders,
        loginAdmin,
        logoutAdmin,
        addToast,
        removeToast,
        resetDatabase
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
