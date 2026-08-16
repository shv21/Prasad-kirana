import type { Product, Category, Offer, Order, StoreSettings } from '../types';

export interface FullStorePayload {
  settings: StoreSettings;
  categories: Category[];
  products: Product[];
  offers: Offer[];
  orders: Order[];
  lastUpdated: string;
}

// Public cloud storage endpoint for Prasad Kirana
const CLOUD_BIN_ID = '65cf8c64dc74654018a7c2d1'; 
const JSONBIN_READ_URL = `https://api.jsonbin.io/v3/b/${CLOUD_BIN_ID}/latest`;
const JSONBIN_UPDATE_URL = `https://api.jsonbin.io/v3/b/${CLOUD_BIN_ID}`;

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Fetch latest live store data from Cloud Database
 */
export async function fetchCloudStoreData(): Promise<FullStorePayload | null> {
  try {
    const res = await fetch(JSONBIN_READ_URL, {
      method: 'GET',
      headers: {
        'X-Master-Key': '$2a$10$uWq.dG5hHj.Z.eL3LgM/vO7V1jQW8V.aJgH5jH5jH5jH5jH5jH5j'
      }
    });
    
    if (!res.ok) return null;
    const json = await res.json();
    if (json && json.record && json.record.products) {
      return json.record as FullStorePayload;
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

      // Post to Cloud Bin API
      await fetch(JSONBIN_UPDATE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$uWq.dG5hHj.Z.eL3LgM/vO7V1jQW8V.aJgH5jH5jH5jH5jH5jH5j'
        },
        body: JSON.stringify(fullData)
      });
    } catch (err) {
      console.warn('Cloud sync push notice (saved locally):', err);
    }
  }, 1000);
}
