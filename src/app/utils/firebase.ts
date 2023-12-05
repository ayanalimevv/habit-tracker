// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
