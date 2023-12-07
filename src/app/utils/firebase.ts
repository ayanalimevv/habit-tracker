// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZCqp9bbci-TFOfC4FYvlbrhsEgdo5kUY",
  authDomain: "habit-tracker-12666.firebaseapp.com",
  projectId: "habit-tracker-12666",
  storageBucket: "habit-tracker-12666.appspot.com",
  messagingSenderId: "758683390454",
  appId: "1:758683390454:web:5a49572d02ff93da77f7d7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
