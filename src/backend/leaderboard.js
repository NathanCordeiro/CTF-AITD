import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

function getStatus(data) {
  const result = Object.values(data).reduce(
    (acc, value) => {
      if (value.hintUsed) {
        acc.hintsUsed += 1;
      }
      if (value.solved) {
        acc.solved += 1;
        if (value.solvedAt) {
          const current = new Date(value.solvedAt).getTime();
          if (!acc.latestSolvedAt || current > new Date(acc.latestSolvedAt).getTime()) {
            acc.latestSolvedAt = value.solvedAt;
          }
        }
      }
      return acc;
    },
    { hintsUsed: 0, solved: 0, latestSolvedAt: null }
  );

  return result;
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getPlayerScores() {
  try {
    const playersData = [];
    const playersEmailDoc = (await getDoc(doc(db, "misc", "players"))).data();
    const playersStatusSnapshot = await getDocs(collection(db, "players"));
    playersStatusSnapshot.forEach((doc) => {
      const result = getStatus(doc.data());
      playersData.push({
        teamName: capitalizeWords(playersEmailDoc[doc.id].replace("@ctfaitd.com", "").split("_").join(" ")),
        score: result.solved * 100 - result.hintsUsed * 30,
        solved: result.solved,
        hintsUsed: result.hintsUsed,
        latestSolvedAt: result.latestSolvedAt,
      });
    });
    return playersData;
  } catch (error) {
    console.error("Error fetching player data:", error);
  }
}
