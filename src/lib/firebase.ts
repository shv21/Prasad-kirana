import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBsDysZAEdmGkZB3V1WA9bmftUOS6EhE9M",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "prasad-kirana-d69fa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "prasad-kirana-d69fa",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "prasad-kirana-d69fa.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1061461232171",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1061461232171:web:282fbc200d955c4341786e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RJ4X0RZ1V1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Enable Offline IndexedDB Persistence for offline support
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.warn('Firestore persistence failed: Multiple tabs open.');
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence.
    console.warn('Firestore persistence is not supported by this browser.');
  }
});
