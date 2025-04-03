import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// consider encrypting this config object
const firebaseConfig = {
  apiKey: "AIzaSyBYv-rFWNS8U8Vzq0qMBHgswHowR0wSlBw",
  authDomain: "ctf-aitd.firebaseapp.com",
  projectId: "ctf-aitd",
  storageBucket: "ctf-aitd.appspot.com",
  messagingSenderId: "1088040604037",
  appId: "1:1088040604037:web:a0d517a551f43f9c40f4ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
