// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCWUFpqwOoI8up20CohHosEX2m53qePkU",
    authDomain: "eventify-30991.firebaseapp.com",
    projectId: "eventify-30991",
    storageBucket: "eventify-30991.appspot.com",
    messagingSenderId: "124059502446",
    appId: "1:124059502446:web:dd904a1a89485c1fe0237f",
    measurementId: "G-V6N7X0BP3J"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const analytics = typeof window !== 'undefined' && getAnalytics(app);

const auth = getAuth(app);

export { app, auth, db };
