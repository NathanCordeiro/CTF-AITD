<script>
  import { navigate } from "svelte5-router";
  import { logout, userId } from "./backend/auth";
  import { onMount } from "svelte";
  import { getPlayerData } from "./backend/database";

  let playerData = null;

  async function handleLogout() {
    await logout();
    alert("Logged Out!");
    navigate("/login");
  }

  async function fetchPlayerData() {
    playerData = await getPlayerData();
    console.log(playerData);
  }

  // Only fetch player data when userId becomes available
  $: if ($userId) {
    fetchPlayerData();
  }
</script>

{#if playerData}
  <pre>{JSON.stringify(playerData, null, 2)}</pre>
{/if}

<h1>Home Page</h1>

{#if playerData}
  {#each Object.entries(playerData) as [puzzle, data]}
    <button style={`background-color: ${data.solved ? "green" : "red"}`} on:click={() => navigate(`/puzzle/${puzzle}/${data.description}`)}>{puzzle}</button>
  {/each}
{/if}

<button on:click={handleLogout}>Logout</button>
