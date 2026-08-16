import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { AnnouncementBar } from './components/customer/AnnouncementBar';
import { Header } from './components/customer/Header';
import { MobileNav } from './components/customer/MobileNav';
import { Hero } from './components/customer/Hero';
import { QuickActions } from './components/customer/QuickActions';
import { QuickRashanList } from './components/customer/QuickRashanList';
import { FlourMillSection } from './components/customer/FlourMillSection';
import { CategoryGrid } from './components/customer/CategoryGrid';
import { ProductGrid } from './components/customer/ProductGrid';
import { OffersSection } from './components/customer/OffersSection';
import { StoreInfo } from './components/customer/StoreInfo';
import { Footer } from './components/customer/Footer';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { viewMode, isAdminLoggedIn } = useStore();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  if (viewMode === 'admin' && isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Header */}
      <Header onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <QuickActions />
        <QuickRashanList />
        <FlourMillSection />
        <CategoryGrid />
        <ProductGrid />
        <OffersSection />
        <StoreInfo />
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

      {/* Mobile Fixed Bottom Navbar */}
      <MobileNav />

      {/* Slide-out Cart Drawer & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <MainLayout />
        <ToastContainer />
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
