import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Read all Firebase configuration values securely from Vite environment variables (import.meta.env)
// ZERO hardcoded strings or API keys exist in this file.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore Instance
export const db = getFirestore(app);

// Enable Offline Persistence for PWA / offline support
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.warn('Firestore persistence failed: Multiple tabs open.');
  } else if (err.code === 'unimplemented') {
    // The current browser does not support IndexedDB persistence.
    console.warn('Firestore persistence is not supported by this browser.');
  }
});
