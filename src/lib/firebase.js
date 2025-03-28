
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtcnu1U5Q9XPWC7gWktUB5uEprZ12SoMY", // Updated API key
  authDomain: "annualverse-11fa7.firebaseapp.com",
  databaseURL: "https://annualverse-11fa7.firebaseio.com",
  projectId: "annualverse-11fa7",
  storageBucket: "annualverse-11fa7.appspot.com",
  messagingSenderId: "724118385680",
  appId: "1:724118385680:web:d60d95b633511ef9df6b67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase initialized successfully");

export { app, auth, db, storage };
