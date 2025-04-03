import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { puzzleGameStructure } from "./constants";

const formatEmail = (username) => `${username}@ctfaitd.com`;

export async function signup(username, password) {
  try {
    const email = formatEmail(username);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "players", user.uid), puzzleGameStructure);
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
