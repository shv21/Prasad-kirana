import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Intercept & suppress Firebase SDK internal console noise ('Database default not found')
if (typeof window !== 'undefined') {
  const origWarn = console.warn;
  const origErr = console.error;

  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes("Database '(default)' not found")) return;
    origWarn.apply(console, args);
  };

  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes("Database '(default)' not found")) return;
    origErr.apply(console, args);
  };
}

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
