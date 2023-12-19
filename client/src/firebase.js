// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rushton-properties.firebaseapp.com",
  projectId: "rushton-properties",
  storageBucket: "rushton-properties.appspot.com",
  messagingSenderId: "947736231843",
  appId: "1:947736231843:web:bbb70151abc66d1fba6416"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);