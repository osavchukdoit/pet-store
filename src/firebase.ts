import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMey5Q7NWqOOCXD0IY4jDEWIbrAV7-IXs",
  authDomain: "shopping-cart-464b5.firebaseapp.com",
  projectId: "shopping-cart-464b5",
  storageBucket: "shopping-cart-464b5.appspot.com",
  messagingSenderId: "157676187699",
  appId: "1:157676187699:web:48d514e8f90d6723343346",
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN_KEY,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);