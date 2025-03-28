
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPNcNNixBLpJPtN4sAJdMlHGL_ixuU5BU",
  authDomain: "annualverse-11fa7.firebaseapp.com",
  projectId: "annualverse-11fa7",
  storageBucket: "annualverse-11fa7.appspot.com",
  messagingSenderId: "1028027921733",
  appId: "1:1028027921733:web:f25d195b2848e509a3fa2c",
  measurementId: "G-ZR0ZS99BHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

console.log("Firebase initialized successfully");

export { app, auth, db, storage };
