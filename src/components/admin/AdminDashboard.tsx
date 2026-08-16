import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Product, Category, Offer, Order } from '../../types';
import { ProductModal } from './ProductModal';
import { CategoryModal } from './CategoryModal';
import { OfferModal } from './OfferModal';
import { OrderDetailsModal } from './OrderDetailsModal';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Tag,
  Settings as SettingsIcon,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  TrendingUp,
  LogOut,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    settings,
    products,
    categories,
    offers,
    orders,
    adminTab,
    setAdminTab,
    deleteProduct,
    deleteAllProducts,
    deleteCategory,
    deleteAllCategories,
    deleteOffer,
    deleteAllOffers,
    deleteAllOrders,
    updateSettings,
    logoutAdmin,
    resetDatabase,
    setViewMode
  } = useStore();

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerToEdit, setOfferToEdit] = useState<Offer | null>(null);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Search & Filters in admin tables
  const [prodSearch, setProdSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  // Analytics Calculations
  const totalSales = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const todayOrders = orders.filter((o) => {
    const orderDate = new Date(o.createdAt).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  });
  const todaySales = todayOrders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'new' || o.status === 'confirmed' || o.status === 'preparing');
  const lowStockProducts = products.filter((p) => p.stockStatus === 'low_stock' || p.stockCount <= 5);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const filteredAdminProducts = products.filter((p) =>
    p.name.toLowerCase().includes(prodSearch.toLowerCase()) ||
    p.brand.toLowerCase().includes(prodSearch.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(prodSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-16">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white shadow-xs">
                PK
              </div>
              <div>
                <h1 className="font-extrabold text-sm sm:text-base leading-tight">
                  {settings.shopName} Admin
                </h1>
                <p className="text-[11px] text-amber-400 font-medium hidden sm:block">
                  Live Store Management Dashboard
                </p>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setViewMode('customer')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>View Customer Storefront</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl text-xs transition-colors"
                title="Logout Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-slate-200">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, badge: pendingOrders.length > 0 ? pendingOrders.length : null },
            { id: 'products', label: 'Products Inventory', icon: Package, badge: products.length },
            { id: 'categories', label: 'Categories', icon: FolderTree, badge: categories.length },
            { id: 'orders', label: 'Customer Orders', icon: ShoppingBag, badge: orders.length },
            { id: 'offers', label: 'Offers & Deals', icon: Tag, badge: offers.length },
            { id: 'settings', label: 'Store Settings', icon: SettingsIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== null && tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Sales</span>
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">₹{todaySales}</h3>
                <p className="text-[11px] text-slate-500 mt-1">From {todayOrders.length} orders today • Total: ₹{totalSales}</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Orders</span>
                  <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{pendingOrders.length}</h3>
                <p className="text-[11px] text-amber-700 font-semibold mt-1">Requires shop processing</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Products</span>
                  <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{products.length}</h3>
                <p className="text-[11px] text-slate-500 mt-1">Across {categories.length} categories</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Low Stock Warning</span>
                  <div className="p-2 bg-red-100 text-red-700 rounded-xl">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{lowStockProducts.length}</h3>
                <p className="text-[11px] text-red-600 font-semibold mt-1">Items ≤ 5 units in shop</p>
              </div>

            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Quick Store Actions</h4>
                <p className="text-xs text-slate-500">Manage products, categories or create deals</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => { setProductToEdit(null); setIsProductModalOpen(true); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
                <button
                  onClick={() => { setCategoryToEdit(null); setIsCategoryModalOpen(true); }}
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
                <button
                  onClick={() => { setOfferToEdit(null); setIsOfferModalOpen(true); }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  Add Offer Banner
                </button>
              </div>
            </div>

            {/* Recent Orders List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-900">Recent Customer Orders</h4>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Items Count</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-emerald-700">
                          #{order.orderNumber}
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{order.customerName}</p>
                          <p className="text-slate-500 text-[11px]">{order.phone}</p>
                        </td>
                        <td className="p-3 capitalize font-medium text-slate-700">
                          {order.deliveryType === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                        </td>
                        <td className="p-3 font-semibold text-slate-800">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} items
                        </td>
                        <td className="p-3 font-extrabold text-slate-900">
                          ₹{order.totalAmount}
                        </td>
                        <td className="p-3">
                          <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => { setSelectedOrder(order); setIsOrderModalOpen(true); }}
                            className="bg-slate-900 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-slate-800"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {adminTab === 'products' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search inventory by product name, brand..."
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-2">
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete ALL products from the store?')) {
                        deleteAllProducts();
                      }
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Products</span>
                  </button>
                )}
                <button
                  onClick={() => { setProductToEdit(null); setIsProductModalOpen(true); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price / MRP</th>
                      <th className="p-3">Stock Count</th>
                      <th className="p-3">Popular / Offer</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAdminProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-contain bg-slate-50 rounded-lg p-1 border border-slate-200 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{p.name}</p>
                              <p className="text-slate-500 text-[11px]">
                                {p.brand} • {p.weight}
                                {p.isFlourMillSpecial && (
                                  <span className="ml-1 text-amber-700 font-bold">🌾 Flour Mill</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-slate-700">{p.categoryName}</td>
                        <td className="p-3">
                          <span className="font-extrabold text-slate-900">₹{p.price}</span>
                          {p.mrp > p.price && (
                            <span className="text-[11px] text-slate-400 line-through ml-1">
                              ₹{p.mrp}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span
                            className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                              p.stockCount <= 0
                                ? 'bg-red-100 text-red-800'
                                : p.stockCount <= 5
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.stockCount} units
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            {p.isPopular && (
                              <span className="bg-emerald-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded">
                                POPULAR
                              </span>
                            )}
                            {p.discountPercent && p.discountPercent > 0 ? (
                              <span className="bg-amber-500 text-slate-950 font-bold text-[9px] px-1.5 py-0.5 rounded">
                                {p.discountPercent}% OFF
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setProductToEdit(p); setIsProductModalOpen(true); }}
                              className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {adminTab === 'categories' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Store Categories</h3>
                <p className="text-xs text-slate-500">Organize your Kirana shop product sections</p>
              </div>
              <div className="flex items-center gap-2">
                {categories.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete ALL categories?')) {
                        deleteAllCategories();
                      }
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Categories</span>
                  </button>
                )}
                <button
                  onClick={() => { setCategoryToEdit(null); setIsCategoryModalOpen(true); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categories.map((c) => {
                const count = products.filter((p) => p.categoryId === c.id).length;
                return (
                  <div
                    key={c.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Order #{c.displayOrder}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{c.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold mt-1">{count} products</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setCategoryToEdit(c); setIsCategoryModalOpen(true); }}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                        title="Edit Category"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCategory(c.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {adminTab === 'orders' && (
          <div className="space-y-4 animate-fade-in">
            
            {/* Status Filter Bar */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  Filter Status:
                </span>
                {['all', 'new', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap capitalize ${
                      orderStatusFilter === st
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {orders.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear ALL customer order history?')) {
                      deleteAllOrders();
                    }
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Orders</span>
                </button>
              )}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <th className="p-3">Order ID & Date</th>
                      <th className="p-3">Customer Info</th>
                      <th className="p-3">Fulfillment</th>
                      <th className="p-3">Items & Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <p className="font-mono font-extrabold text-emerald-700 text-sm">
                            #{order.orderNumber}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{order.customerName}</p>
                          <p className="text-slate-500 text-[11px] font-mono">📞 {order.phone}</p>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 block">
                            {order.deliveryType === 'delivery' ? '🚚 Home Delivery' : '🏪 Store Pickup'}
                          </span>
                          <span className="text-[11px] text-slate-500 uppercase">{order.paymentType}</span>
                        </td>
                        <td className="p-3">
                          <p className="font-extrabold text-slate-900 text-sm">₹{order.totalAmount}</p>
                          <p className="text-[11px] text-slate-500">
                            {order.items.reduce((s, i) => s + i.quantity, 0)} items
                          </p>
                        </td>
                        <td className="p-3">
                          <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => { setSelectedOrder(order); setIsOrderModalOpen(true); }}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-2xs"
                          >
                            View & Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: OFFERS MANAGEMENT */}
        {adminTab === 'offers' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Promotional Banners & Deals</h3>
                <p className="text-xs text-slate-500">Highlight discount sales on customer homepage</p>
              </div>
              <div className="flex items-center gap-2">
                {offers.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete ALL promotional offers?')) {
                        deleteAllOffers();
                      }
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete All Offers</span>
                  </button>
                )}
                <button
                  onClick={() => { setOfferToEdit(null); setIsOfferModalOpen(true); }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Offer Banner</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`p-5 rounded-2xl bg-gradient-to-br ${offer.bannerColor} text-white shadow-md flex flex-col justify-between`}
                >
                  <div className="space-y-2">
                    <span className="inline-block bg-white/20 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                      {offer.discountText}
                    </span>
                    <h4 className="font-bold text-base">{offer.title}</h4>
                    <p className="text-xs text-white/90">{offer.subtitle}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="font-bold">{offer.isActive ? '✅ Active' : '❌ Disabled'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setOfferToEdit(offer); setIsOfferModalOpen(true); }}
                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteOffer(offer.id)}
                        className="p-1.5 bg-red-600/60 hover:bg-red-600 rounded-lg text-white"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STORE SETTINGS */}
        {adminTab === 'settings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-3xl">
              <h3 className="text-base font-extrabold text-slate-900 mb-1">
                Storefront Information & Settings
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Update shop details, contact phone, WhatsApp number, minimum order values, and delivery charges without editing code.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Shop Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.shopName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, shopName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Proprietor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.proprietorName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, proprietorName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Store Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number for Orders *
                    </label>
                    <input
                      type="text"
                      required
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.deliveryFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, deliveryFee: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Free Delivery Min Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={settingsForm.freeDeliveryMin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryMin: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      value={settingsForm.openingHours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Store Sub-headline / Tagline (Hero Banner)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Shop Address *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nearby Landmark *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.landmark}
                      onChange={(e) => setSettingsForm({ ...settingsForm, landmark: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 font-semibold text-amber-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950 mb-1">
                      📸 Main Hero Storefront Showcase Image URL *
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={settingsForm.heroImageUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Changes main homepage showcase photo.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-950 mb-1">
                      🌾 Atta Chakki (Flour Mill) Showcase Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={settingsForm.flourMillImageUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, flourMillImageUrl: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Changes flour mill section photo.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Top Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcementBar}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementBar: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    About Store Description Text
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.aboutText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🏦 CSP Banking Service Point Information Text
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.cspServicesInfo}
                    onChange={(e) => setSettingsForm({ ...settingsForm, cspServicesInfo: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    🌾 Atta Chakki (Flour Mill) Service Information Text
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.flourMillInfo}
                    onChange={(e) => setSettingsForm({ ...settingsForm, flourMillInfo: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-4 border border-slate-800">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-400">
                    🔑 Security & Admin Account Credentials
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Admin Login ID / Username *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminUsername || 'abhimanyu'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminUsername: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-white font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Default ID is <strong>abhimanyu</strong>.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Admin Login Password *
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.adminPassword || 'abhimanyu.jadhav'}
                        onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-amber-400 font-bold"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Default Password is <strong>abhimanyu.jadhav</strong>.</p>
                    </div>
                  </div>
                </div>

                {/* Backup & Restore Panel */}
                <div className="p-4 bg-slate-100 rounded-2xl space-y-3 border border-slate-200">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                    💾 Real-Life Store Data Backup & Transfer
                  </h4>
                  <p className="text-xs text-slate-600">
                    Export your full inventory, categories, offers, and settings as a JSON backup file to transfer to another phone/laptop or keep a safe offline copy.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const data = {
                          settings,
                          products,
                          categories,
                          offers,
                          orders,
                          exportDate: new Date().toISOString()
                        };
                        const jsonStr = JSON.stringify(data, null, 2);
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `prasad_kirana_backup_${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>📥 Download Backup (Export JSON)</span>
                    </button>

                    <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-2xs">
                      <span>📤 Restore Backup (Import JSON)</span>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            try {
                              const parsed = JSON.parse(evt.target?.result as string);
                              if (parsed.settings && parsed.products && parsed.categories) {
                                localStorage.setItem('prasad_kirana_db_v1_settings', JSON.stringify(parsed.settings));
                                localStorage.setItem('prasad_kirana_db_v1_products', JSON.stringify(parsed.products));
                                localStorage.setItem('prasad_kirana_db_v1_categories', JSON.stringify(parsed.categories));
                                if (parsed.offers) localStorage.setItem('prasad_kirana_db_v1_offers', JSON.stringify(parsed.offers));
                                if (parsed.orders) localStorage.setItem('prasad_kirana_db_v1_orders', JSON.stringify(parsed.orders));
                                window.location.reload();
                              } else {
                                alert('Invalid backup JSON file format!');
                              }
                            } catch (err) {
                              alert('Error parsing JSON file!');
                            }
                          };
                          reader.readAsText(file);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetDatabase}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 py-2 px-3 bg-red-50 rounded-xl border border-red-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Data to Sample Defaults
                  </button>

                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
                  >
                    Save Store Settings
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categoryToEdit={categoryToEdit}
      />

      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        offerToEdit={offerToEdit}
      />

      <OrderDetailsModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
      />

    </div>
  );
};
