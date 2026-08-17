import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { StoreSettings } from '../types';

/**
 * Listen to real-time changes on any Firestore collection
 */
export function listenToCollection<T>(
  collectionName: string,
  callback: (items: T[]) => void
): () => void {
  const colRef = collection(db, collectionName);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: T[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      })) as unknown as T[];
      callback(items);
    },
    (err) => {
      console.error(`Error listening to collection ${collectionName}:`, err);
    }
  );
}

/**
 * Listen to real-time changes on the single store settings document ('settings/storeConfig')
 */
export function listenToStoreSettings(
  callback: (settings: StoreSettings | null) => void
): () => void {
  const settingsDocRef = doc(db, 'settings', 'storeConfig');
  return onSnapshot(
    settingsDocRef,
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as StoreSettings);
      } else {
        callback(null);
      }
    },
    (err) => {
      console.error('Error listening to store settings:', err);
    }
  );
}

/**
 * Fetch all documents from a collection once
 */
export async function getAllDocuments<T>(collectionName: string): Promise<T[]> {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  })) as unknown as T[];
}

/**
 * Add or overwrite a document in a collection with a specific or auto-generated ID
 */
export async function setDocument<T extends object>(
  collectionName: string,
  id: string,
  data: T
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data, { merge: true });
}

/**
 * Update specific fields of an existing document in a collection
 */
export async function updateDocument<T extends object>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data as Record<string, unknown>);
}

/**
 * Delete a single document from a collection
 */
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

/**
 * Delete ALL documents in a collection (Bulk Delete)
 */
export async function deleteAllDocuments(collectionName: string): Promise<void> {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  const batch = writeBatch(db);
  snapshot.docs.forEach((docSnap) => {
    batch.delete(docSnap.ref);
  });
  await batch.commit();
}

/**
 * Fetch store settings document once ('settings/storeConfig')
 */
export async function getStoreSettings(): Promise<StoreSettings | null> {
  const settingsDocRef = doc(db, 'settings', 'storeConfig');
  const docSnap = await getDoc(settingsDocRef);
  if (docSnap.exists()) {
    return docSnap.data() as StoreSettings;
  }
  return null;
}

/**
 * Update store settings document ('settings/storeConfig')
 */
export async function updateStoreSettings(newSettings: Partial<StoreSettings>): Promise<void> {
  const settingsDocRef = doc(db, 'settings', 'storeConfig');
  await setDoc(settingsDocRef, newSettings, { merge: true });
}
