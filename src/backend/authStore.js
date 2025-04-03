import { auth } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { writable } from "svelte/store";
import { db } from "./database";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Function to convert username into an email format
const formatEmail = (username) => `${username}@ctfaitd.com`;
export const user = writable(null);

// Listen for auth state changes
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user.set(currentUser.email.split("@")[0]); // Extract username from email
  } else {
    user.set(null);
  }
});

export async function signup(username, password) {
  console.log("Attempting signup...");
  console.log("Username:", username);
  console.log("Password:", password);

  try {
    const email = formatEmail(username);
    console.log("Formatted Email:", email);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a Firestore document for the user in "players" collection
    await setDoc(doc(db, "players", user.uid), {
      "Mystic Maze": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Cryptic Crossword": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Number Riddle": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Hidden Treasure": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Memory Match": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Code Breaker": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Word Scramble": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
      "Sudoku Challenge": {
        hintUsed: false,
        solved: false,
        solvedAt: null,
      },
    });

    console.log("User document created in Firestore.");
  } catch (error) {
    console.error("Signup Error:", error);
  }
}

export async function login(username, password) {
  try {
    const email = formatEmail(username);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "players", user.uid));

    if (userDoc.exists()) {
      console.log("User Data:", userDoc.data());
    } else {
    }

    console.log("Login successful!");
  } catch (error) {
    console.error("Login Error:", error);
  }
}

async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
}
