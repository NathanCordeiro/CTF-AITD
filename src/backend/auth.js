import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { writable } from "svelte/store";

export const userId = writable(null);
const formatEmail = (username) => `${username}@ctfaitd.com`;

onAuthStateChanged(auth, (user) => {
  userId.set(user ? user.uid : null);
});

async function createPlayerGameStatusStructure() {
  const puzzles = (await getDoc(doc(db, "misc", "puzzles"))).data().puzzles;
  const playerGameStatusStructure = puzzles.reduce((acc, puzzle) => {
    acc[puzzle.puzzleName] = {
      hintUsed: false,
      solved: false,
      solvedAt: null,
      description: puzzle.description,
    };
    return acc;
  }, {});
  return playerGameStatusStructure;
}

export async function signup(username, password) {
  try {
    const email = formatEmail(username);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const playerGameStatusStructure = await createPlayerGameStatusStructure();
    console.log(playerGameStatusStructure);

    // Set the player's game status structure in the "players" collection
    await setDoc(doc(db, "players", user.uid), playerGameStatusStructure);

    // Fetch the "misc" collection and "players" document
    const miscDocRef = doc(db, "misc", "players");
    const miscDocSnap = await getDoc(miscDocRef);

    let playersData = {};
    if (miscDocSnap.exists()) {
      // If the document exists, get the existing data
      playersData = miscDocSnap.data();
    }

    // Add the new user.uid and email as a key-value pair
    playersData[user.uid] = email;

    // Update the "players" document in the "misc" collection
    await setDoc(miscDocRef, playersData);

    return user.uid;
  } catch (error) {
    console.error(`Error Signing Up Username: ${username}`, error);
  }
}

export async function login(username, password) {
  try {
    const email = formatEmail(username);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return user.uid;
  } catch (error) {
    console.error(`Error Loggin In Username: ${username}`, error);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error Logging Out User", error);
  }
}