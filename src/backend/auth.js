import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const formatEmail = (username) => `${username}@ctfaitd.com`;

async function createPlayerGameStatusStructure() {
  const puzzles = (await getDoc(doc(db, "misc", "puzzles"))).data().puzzles;
  const playerGameStatusStructure = puzzles.reduce((acc, puzzle) => {
    acc[puzzle] = {
      hintUsed: false,
      solved: false,
      solvedAt: null,
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
    await setDoc(doc(db, "players", user.uid), playerGameStatusStructure);
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

export const getCurrentUser = () => {
  return auth.currentUser ? auth.currentUser : null;
};
