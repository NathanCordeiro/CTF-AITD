<script>
  import { logout } from "../backend/auth";
  import { getPlayerData, getFlag, getHint, markPuzzleAsSolved, markHintAsUsed } from "../backend/database";
  import { onMount } from "svelte";

  let playerData = null;
  let puzzleName = "";
  let retrievedFlag = "";
  let retrievedHint = "";
  let errorMessage = "";

  async function fetchPlayerData() {
    errorMessage = "";
    playerData = await getPlayerData();
    if (!playerData) {
      errorMessage = "No player data found!";
    }
  }

  async function fetchFlag() {
    if (!puzzleName) return;
    errorMessage = "";
    retrievedFlag = await getFlag(puzzleName);
    if (!retrievedFlag) {
      errorMessage = `Flag for ${puzzleName} not found!`;
    }
  }

  async function fetchHint() {
    if (!puzzleName) return;
    errorMessage = "";
    retrievedHint = await getHint(puzzleName);
    if (!retrievedHint) {
      errorMessage = `Hint for ${puzzleName} not found!`;
    }
  }

  async function solvePuzzle() {
    if (!puzzleName) return;
    errorMessage = "";
    await markPuzzleAsSolved(puzzleName);
    await fetchPlayerData();
  }

  async function useHint() {
    if (!puzzleName) return;
    errorMessage = "";
    await markHintAsUsed(puzzleName);
    await fetchPlayerData();
  }

  onMount(fetchPlayerData);
</script>

<main>
  <h1>CTF Firebase Tester</h1>

  <button on:click={fetchPlayerData}>Refresh Player Data</button>

  {#if playerData}
    <pre>{JSON.stringify(playerData, null, 2)}</pre>
  {/if}

  <div>
    <label>Puzzle Name:</label>
    <input type="text" bind:value={puzzleName} placeholder="Enter puzzle name" />
  </div>

  <button on:click={fetchFlag}>Get Flag</button>
  {#if retrievedFlag}
    <p>Flag: {retrievedFlag}</p>
  {/if}

  <button on:click={fetchHint}>Get Hint</button>
  {#if retrievedHint}
    <p>Hint: {retrievedHint}</p>
  {/if}

  <button on:click={solvePuzzle}>Mark Puzzle as Solved</button>
  <button on:click={useHint}>Mark Hint as Used</button>

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}

  <button
  style="background-color: lightcoral;"
    on:click={() => {
      logout();
    }}>Logout</button
  >
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 600px;
    margin: auto;
  }
  button {
    margin: 5px;
    padding: 8px 12px;
    cursor: pointer;
  }
  input {
    padding: 5px;
    margin: 5px;
  }
</style>
