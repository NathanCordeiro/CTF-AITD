import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYv-rFWNS8U8Vzq0qMBHgswHowR0wSlBw",
  authDomain: "ctf-aitd.firebaseapp.com",
  projectId: "ctf-aitd",
  storageBucket: "ctf-aitd.firebasestorage.app",
  messagingSenderId: "1088040604037",
  appId: "1:1088040604037:web:a0d517a551f43f9c40f4ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to convert username into an email format
const formatEmail = (username) => `${username}@ctfaitd.com`;

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, formatEmail };




