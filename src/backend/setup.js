// This file needs to be deleted once the firestore database is set up.

import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { puzzleData } from "./constants";

function vigenereEncrypt(text, key) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?";
  const keyLength = key.length;
  let encryptedText = "";

  for (let i = 0, j = 0; i < text.length; i++) {
    const char = text[i];
    const textIndex = alphabet.indexOf(char);

    if (textIndex === -1) {
      encryptedText += char; // Keep characters that aren't in the alphabet
      continue;
    }

    const keyIndex = alphabet.indexOf(key[j % keyLength]);
    const newIndex = (textIndex + keyIndex) % alphabet.length;
    encryptedText += alphabet[newIndex];
    j++;
  }
  return encryptedText;
}

export function encryptPuzzleData(puzzleData, key) {
  return puzzleData.map((puzzle) => ({
    puzzleName: puzzle.puzzleName,
    flag: vigenereEncrypt(puzzle.flag, key),
    hint: vigenereEncrypt(puzzle.hint, key),
  }));
}

export async function uploadPuzzles() {
  try {
    const encryptedData = encryptPuzzleData(puzzleData, "aitdctf2025"); // use a random key here
    const puzzles = [];
    for (const puzzle of encryptedData) {
      const { puzzleName, flag, hint } = puzzle;

      await setDoc(doc(db, "hints", puzzleName), { hint });
      await setDoc(doc(db, "flags", puzzleName), { flag });

      puzzles.push(puzzleName);
      console.log(`Uploaded ${puzzleName}`);
    }
    await setDoc(doc(db, "misc", "puzzles"), { puzzles });
    console.log("All puzzles uploaded successfully.");
  } catch (error) {
    console.error("Error uploading puzzles:", error);
  }
}
