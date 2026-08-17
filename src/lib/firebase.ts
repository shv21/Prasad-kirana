import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Helper to sanitize environment variable strings (removes accidental quotes and spaces)
const clean = (val: string | undefined, fallback: string): string => {
  if (!val) return fallback;
  const sanitized = val.replace(/["']/g, '').trim();
  return sanitized.length > 0 ? sanitized : fallback;
};

const firebaseConfig = {
  apiKey: clean(import.meta.env.VITE_FIREBASE_API_KEY, "AIzaSyBsDysZAEdmGkZB3V1WA9bmftUOS6EhE9M"),
  authDomain: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, "prasad-kirana-d69fa.firebaseapp.com"),
  projectId: clean(import.meta.env.VITE_FIREBASE_PROJECT_ID, "prasad-kirana-d69fa"),
  storageBucket: clean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, "prasad-kirana-d69fa.firebasestorage.app"),
  messagingSenderId: clean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, "1061461232171"),
  appId: clean(import.meta.env.VITE_FIREBASE_APP_ID, "1:1061461232171:web:282fbc200d955c4341786e")
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore Instance
export const db = getFirestore(app);

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Firestore persistence failed: Multiple tabs open.');
  } else if (err.code === 'unimplemented') {
    console.warn('Firestore persistence is not supported by this browser.');
  }
});
