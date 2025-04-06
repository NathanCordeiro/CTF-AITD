<script>
  import { onMount } from "svelte";
  import { getFlag, getHint, getPlayerData, markHintAsUsed, markPuzzleAsSolved } from "./backend/database";
  import { navigate } from "svelte5-router";

  export let puzzleName = "defaultPuzzle";
  export let puzzleDescription = "defaultDescription";
  export let flag = ""; // Bind the flag input to this variable
  export let checkFlag = async () => {
    if (flag === (await getFlag(puzzleName))) {
      alert("Correct flag!");
      await markPuzzleAsSolved(puzzleName);
      navigate("/home");
    } else {
      alert("Incorrect flag. Try again.");
    }
  };

  let hint = null;
  onMount(async () => {
    let playerData = await getPlayerData();
    if (playerData[puzzleName].hintUsed) {
      hint = await getHint(puzzleName);
    }
  }); // Assuming this is defined in your backend/database.js

  async function handleHintRequest() {
    const input = prompt("Type 'confirm' to take a hint:");
    if (input && input.toLowerCase() === "confirm") {
      console.log(`User has taken a hint for ${puzzleName}`);
      hint = await getHint(puzzleName);
      await markHintAsUsed(puzzleName);
    } else {
      console.log("Hint request canceled or incorrect confirmation.");
    }
  }
</script>

<h1>This is the Puzzle page</h1>
<p>Current puzzle: {puzzleName}</p>
<p>Current puzzle description: {puzzleDescription}</p>

{#if !hint}
  <button on:click={handleHintRequest}>Take Hint</button>
{/if}
<p>hint: {hint}</p>

<!-- makke an input box to take the flag as input and a button to check if the flag is correct -->
<input type="text" placeholder="Enter flag" bind:value={flag} />
<button on:click={checkFlag}>Check Flag</button>
