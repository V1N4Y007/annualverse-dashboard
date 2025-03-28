
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5rNgYJPuAXC8pYXzRMcnRUcfPDu54Zf8",
  authDomain: "annual-report-portal.firebaseapp.com",
  projectId: "annual-report-portal",
  storageBucket: "annual-report-portal.appspot.com",
  messagingSenderId: "935642752424",
  appId: "1:935642752424:web:73526b59786f3ff13a0a7e",
  measurementId: "G-45E1QCGT85"
};

// Initialize Firebase
console.log("Initializing Firebase");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase initialized successfully");

export { app, auth, db, storage };
