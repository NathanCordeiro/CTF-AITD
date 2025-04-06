<script>
  import { onMount } from "svelte";
  import { getFlag, getHint, getPlayerData, markHintAsUsed, markPuzzleAsSolved } from "./backend/database";
  import { navigate } from "svelte5-router";

  export let puzzleName = "defaultPuzzle";
  export let puzzleDescription = "defaultDescription";
  export let flag = "";

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
  });

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

<div class="puzzle-container">
  <h1 class="puzzle-title">{puzzleName}</h1>
  <p class="puzzle-desc">{puzzleDescription}</p>

  {#if !hint}
    <button class="hint-button" on:click={handleHintRequest}>Take Hint</button>
  {:else}
    <p class="hint-text"><strong>Hint:</strong> {hint}</p>
  {/if}

  <div class="flag-input-container">
    <input class="flag-input" type="text" placeholder="Enter flag" bind:value={flag} />
    <button class="check-button" on:click={checkFlag}>Check Flag</button>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

  :global(body) {
    font-family: "Inter", sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    margin: 0;
    padding: 2rem;
  }

  .puzzle-container {
    max-width: 600px;
    margin: auto;
    background: #ffffff;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .puzzle-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .puzzle-desc {
    font-size: 1rem;
    color: #334155;
    margin: 0;
  }

  .hint-button,
  .check-button {
    background: linear-gradient(to right, #6366f1, #60a5fa);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    white-space: nowrap
  }

  .hint-button:hover,
  .check-button:hover {
    background: linear-gradient(to right, #4f46e5, #3b82f6);
  }

  .flag-input-container {
    display: flex;
    gap: 1rem;
  }

  .flag-input {
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .hint-text {
    background-color: #f1f5f9;
    padding: 0.75rem 1rem;
    border-left: 4px solid #3b82f6;
    border-radius: 0.5rem;
    color: #1e293b;
  }

  @media (max-width: 640px) {
    .puzzle-container {
      padding: 1.25rem;
    }

    .puzzle-title {
      font-size: 1.5rem;
    }

    .hint-button,
    .check-button {
      width: 100%;
      padding: 0.75rem;
    }
  }
</style>
