// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjtvs5DJZgCyoMQjLwGvLsr874x4O_WPo",
  authDomain: "car-booking-e2cae.firebaseapp.com",
  projectId: "car-booking-e2cae",
  storageBucket: "car-booking-e2cae.firebasestorage.app",
  messagingSenderId: "399243130419",
  appId: "1:399243130419:web:b2fbcd0cfbbfc0436fd546"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Services
const auth = getAuth(app);  // For Google Authentication
const db = getFirestore(app);  // Firestore Database
const provider = new GoogleAuthProvider();  // Google Login Provider
const storage = getStorage(app);

export { auth, db, provider, storage };