import type { Product, Category, Offer, Order, StoreSettings } from '../types';

export interface FullStorePayload {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  lastUpdated: string;
}

/**
 * Local cache storage fallback
 */
export async function fetchCloudStoreData(): Promise<FullStorePayload | null> {
  try {
    const settingsStr = localStorage.getItem('prasad_kirana_settings');
    const categoriesStr = localStorage.getItem('prasad_kirana_categories');
    const productsStr = localStorage.getItem('prasad_kirana_products');
    const offersStr = localStorage.getItem('prasad_kirana_offers');
    const ordersStr = localStorage.getItem('prasad_kirana_orders');

    if (settingsStr || productsStr) {
      return {
        settings: settingsStr ? JSON.parse(settingsStr) : undefined,
        categories: categoriesStr ? JSON.parse(categoriesStr) : [],
        products: productsStr ? JSON.parse(productsStr) : [],
        offers: offersStr ? JSON.parse(offersStr) : [],
        orders: ordersStr ? JSON.parse(ordersStr) : [],
        lastUpdated: new Date().toISOString()
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Persist store data to local storage
 */
export function syncStoreDataToCloud(payload: Omit<FullStorePayload, 'lastUpdated'>): void {
  try {
    localStorage.setItem('prasad_kirana_settings', JSON.stringify(payload.settings));
    localStorage.setItem('prasad_kirana_categories', JSON.stringify(payload.categories));
    localStorage.setItem('prasad_kirana_products', JSON.stringify(payload.products));
    localStorage.setItem('prasad_kirana_offers', JSON.stringify(payload.offers));
    localStorage.setItem('prasad_kirana_orders', JSON.stringify(payload.orders));
  } catch (err) {
    console.warn('Sync notice:', err);
  }
}
