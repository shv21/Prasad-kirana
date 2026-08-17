import type { Product, Category, Offer, Order, StoreSettings } from '../types';

export interface FullStorePayload {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  lastUpdated: string;
}

// Live Cloud REST Database Endpoint for Prasad Kirana
const CLOUD_ENDPOINT_URL = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a00a8dcfaf2c19';

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Fetch latest live store data from Cloud Database
 */
export async function fetchCloudStoreData(): Promise<FullStorePayload | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(CLOUD_ENDPOINT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data && typeof json.data === 'object') {
      return json.data as FullStorePayload;
    }
    return null;
  } catch (err) {
    // Graceful fallback to cached data if cloud is unreachable or rate limited
    return null;
  }
}

/**
 * Push updated store data to Cloud Database
 */
export function syncStoreDataToCloud(payload: Omit<FullStorePayload, 'lastUpdated'>): void {
  if (saveTimeout) clearTimeout(saveTimeout);

  saveTimeout = setTimeout(async () => {
    try {
      const fullData: FullStorePayload = {
        ...payload,
        lastUpdated: new Date().toISOString()
      };

      // 1. Immediate local persistence
      localStorage.setItem('prasad_kirana_db_v1_settings', JSON.stringify(payload.settings));
      localStorage.setItem('prasad_kirana_db_v1_categories', JSON.stringify(payload.categories));
      localStorage.setItem('prasad_kirana_db_v1_products', JSON.stringify(payload.products));
      localStorage.setItem('prasad_kirana_db_v1_offers', JSON.stringify(payload.offers));
      localStorage.setItem('prasad_kirana_db_v1_orders', JSON.stringify(payload.orders));

      // 2. Push to Cloud REST Database (compact payload)
      await fetch(CLOUD_ENDPOINT_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'prasad_kirana_live_payload',
          data: fullData
        })
      });
    } catch (err) {
      console.warn('Cloud push notice:', err);
    }
  }, 1000);
}
