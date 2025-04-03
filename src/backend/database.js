import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { vigenereDecrypt } from "./utils";

export async function getPlayerData() {
  const playerDocSnap = await getDoc(doc(db, "players", auth.currentUser.uid));

  if (playerDocSnap.exists()) {
    return playerDocSnap.data();
  } else {
    console.log(`Document ${auth.currentUser.uid} does not exist`);
    return null;
  }
}

export async function getFlag(puzzleName) {
  const playerDocSnap = await getDoc(doc(db, "flags", puzzleName));
  if (playerDocSnap.exists()) {
    return vigenereDecrypt(playerDocSnap.data().flag, "aitdctf2025");
  } else {
    console.log(`Document ${auth.currentUser.uid} does not exist`);
    return null;
  }
}

export async function getHint(puzzleName) {
  const playerDocSnap = await getDoc(doc(db, "hints", puzzleName));
  if (playerDocSnap.exists()) {
    return vigenereDecrypt(playerDocSnap.data().hint, "aitdctf2025");
  } else {
    console.log(`Document ${auth.currentUser.uid} does not exist`);
    return null;
  }
}

export async function markPuzzleAsSolved(puzzleName) {
  try {
    const solvedAt = new Date().toISOString();
    const playerDocRef = doc(db, "players", auth.currentUser.uid);

    await updateDoc(playerDocRef, {
      [`${puzzleName}.solved`]: true,
      [`${puzzleName}.solvedAt`]: solvedAt,
    });
  } catch (error) {
    console.error("Error updating puzzle:", error);
  }
}

export async function markHintAsUsed(puzzleName) {
  try {
    const playerDocRef = doc(db, "players", auth.currentUser.uid);

    await updateDoc(playerDocRef, {
      [`${puzzleName}.hintUsed`]: true,
    });
  } catch (error) {
    console.error("Error updating hint:", error);
  }
}
