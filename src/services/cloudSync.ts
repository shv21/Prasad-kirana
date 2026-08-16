import type { Product, Category, Offer, Order, StoreSettings } from '../types';

export interface FullStorePayload {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  lastUpdated: string;
}

// Live Cloud REST database ID for Prasad Kirana
const CLOUD_OBJECT_ID = 'ff8081819ff5b11001a00a8dcfaf2c19';
const CLOUD_ENDPOINT_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Fetch latest live store data from Cloud Database
 */
export async function fetchCloudStoreData(): Promise<FullStorePayload | null> {
  try {
    const res = await fetch(CLOUD_ENDPOINT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.data && json.data.products && Array.isArray(json.data.products)) {
      return json.data as FullStorePayload;
    }
    return null;
  } catch (err) {
    console.warn('Cloud sync fetch notice (using cached data):', err);
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

      // Save to localStorage as immediate offline cache
      localStorage.setItem('prasad_kirana_db_v1_settings', JSON.stringify(payload.settings));
      localStorage.setItem('prasad_kirana_db_v1_categories', JSON.stringify(payload.categories));
      localStorage.setItem('prasad_kirana_db_v1_products', JSON.stringify(payload.products));
      localStorage.setItem('prasad_kirana_db_v1_offers', JSON.stringify(payload.offers));
      localStorage.setItem('prasad_kirana_db_v1_orders', JSON.stringify(payload.orders));

      // PUT to Cloud REST Database
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
      console.warn('Cloud sync push notice (saved locally):', err);
    }
  }, 1000);
}
