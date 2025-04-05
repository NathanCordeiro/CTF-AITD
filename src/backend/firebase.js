import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// consider encrypting this config object
const firebaseConfig = {
  apiKey: "AIzaSyAPRxb9M4Kb65jGk9qgAt_07qqwl8t8lk0",
  authDomain: "ctf-aitd25.firebaseapp.com",
  projectId: "ctf-aitd25",
  storageBucket: "ctf-aitd25.firebasestorage.app",
  messagingSenderId: "824852465077",
  appId: "1:824852465077:web:e31ab84818543d8ab045fc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
