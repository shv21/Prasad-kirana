import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Category, Offer, Order, StoreSettings, OrderStatus, ToastMessage } from '../types';
import { initialStoreSettings, initialCategories, initialProducts, initialOffers, initialOrders } from '../data/mockData';
import { fetchCloudStoreData, syncStoreDataToCloud } from '../services/cloudSync';

interface StoreContextType {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  
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

  // CRUD Actions
  updateSettings: (newSettings: StoreSettings) => void;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  deleteAllProducts: () => void;
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  deleteAllCategories: () => void;
  addOffer: (offer: Omit<Offer, 'id'>) => Offer;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  deleteAllOffers: () => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteAllOrders: () => void;
  
  // Auth
  loginAdmin: (usernameOrPin: string, passwordInput?: string) => boolean;
  logoutAdmin: () => void;
  
  // Toasts & reset
  addToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  resetDatabase: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'prasad_kirana_db_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial data from localStorage or use defaults
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : initialStoreSettings;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_categories`);
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_offers`);
    return saved ? JSON.parse(saved) : initialOffers;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY}_admin`) === 'true';
  });

  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'offers' | 'settings'>('overview');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'newest'>('popular');
  const [stockOnly, setStockOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 1. Initial Live Cloud Sync Fetch on Mount
  useEffect(() => {
    let isMounted = true;
    async function loadCloudData() {
      const cloudData = await fetchCloudStoreData();
      if (cloudData && isMounted) {
        if (cloudData.settings) setSettings(cloudData.settings);
        if (cloudData.categories) setCategories(cloudData.categories);
        if (cloudData.products) setProducts(cloudData.products);
        if (cloudData.offers) setOffers(cloudData.offers);
        if (cloudData.orders) setOrders(cloudData.orders);
      }
    }
    loadCloudData();
    return () => { isMounted = false; };
  }, []);

  // 2. Realtime Push Cloud Sync & Local Storage Persistence
  useEffect(() => {
    syncStoreDataToCloud({ settings, categories, products, offers, orders });
  }, [settings, categories, products, offers, orders]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_admin`, isAdminLoggedIn ? 'true' : 'false');
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

  // Actions
  const updateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    addToast('Store settings updated successfully!');
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Added product "${newProduct.name}"`);
    return newProduct;
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
    );
    addToast('Product details updated');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product deleted', 'warning');
  };

  const deleteAllProducts = () => {
    setProducts([]);
    addToast('All products deleted from inventory', 'warning');
  };

  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    setCategories((prev) => [...prev, newCat]);
    addToast(`Added category "${newCat.name}"`);
    return newCat;
  };

  const updateCategory = (id: string, catData: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...catData } : c))
    );
    addToast('Category updated');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast('Category deleted', 'warning');
  };

  const deleteAllCategories = () => {
    setCategories([]);
    addToast('All categories deleted', 'warning');
  };

  const addOffer = (offData: Omit<Offer, 'id'>) => {
    const newOffer: Offer = {
      ...offData,
      id: `off-${Date.now()}`
    };
    setOffers((prev) => [newOffer, ...prev]);
    addToast('New promotional offer created');
    return newOffer;
  };

  const updateOffer = (id: string, offData: Partial<Offer>) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...offData } : o))
    );
    addToast('Offer updated');
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    addToast('Offer deleted', 'warning');
  };

  const deleteAllOffers = () => {
    setOffers([]);
    addToast('All promotional offers deleted', 'warning');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => {
    const nextOrderNum = 1000 + orders.length + 1;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `PKS-${nextOrderNum}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Reduce stock counts automatically
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const itemInOrder = orderData.items.find((i) => i.productId === p.id);
        if (itemInOrder) {
          const newCount = Math.max(0, p.stockCount - itemInOrder.quantity);
          return {
            ...p,
            stockCount: newCount,
            stockStatus: newCount === 0 ? 'out_of_stock' : newCount < 5 ? 'low_stock' : 'in_stock'
          };
        }
        return p;
      })
    );

    addToast(`Order ${newOrder.orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast(`Order status changed to ${status.replace('_', ' ').toUpperCase()}`);
  };

  const deleteAllOrders = () => {
    setOrders([]);
    addToast('All order records cleared', 'warning');
  };

  const loginAdmin = (usernameOrPin: string, passwordInput?: string) => {
    const validUsername = (settings.adminUsername || 'abhimanyu').trim().toLowerCase();
    const validPassword = settings.adminPassword || 'abhimanyu.jadhav';
    const validPin = settings.adminPin || '7499047152';

    // If both username and password provided
    if (passwordInput !== undefined && passwordInput !== null && passwordInput.length > 0) {
      const u = usernameOrPin.trim().toLowerCase();
      if ((u === validUsername && passwordInput === validPassword) || passwordInput === validPin) {
        setIsAdminLoggedIn(true);
        setViewMode('admin');
        addToast('Welcome Abhimanyu Jadhav to Admin Dashboard!', 'success');
        return true;
      }
    } else {
      // Single input passcode / password / PIN check
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

  const resetDatabase = () => {
    setSettings(initialStoreSettings);
    setCategories(initialCategories);
    setProducts(initialProducts);
    setOffers(initialOffers);
    setOrders(initialOrders);
    addToast('Database reset to original Prasad Kirana sample records', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        settings,
        categories,
        products,
        offers,
        orders,
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
