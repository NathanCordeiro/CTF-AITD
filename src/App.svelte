<script>
  import Auth from "./components/Auth.svelte";
  import Database from "./components/Database.svelte";
  import { uploadPuzzles } from "./backend/setup";
  import { userId } from "./backend/auth";
  import { getPlayerScores } from "./backend/leaderboard";
  import { onMount } from "svelte";
  import Leaderboard from "./components/Leaderboard.svelte";

  let playersData = null;
  onMount(async () => {
    // playersData = await getPlayerScores();
    playersData = [
      {
        teamName: "Nathan",
        score: 270,
        solved: 3,
        hintsUsed: 1,
        latestSolvedAt: "2025-04-05T20:32:44.885Z",
      },
      {
        teamName: "Valerian",
        score: 270,
        solved: 3,
        hintsUsed: 1,
        latestSolvedAt: "2025-04-05T20:06:04.514Z",
      },
      {
        teamName: "Gauraang",
        score: -120,
        solved: 0,
        hintsUsed: 4,
        latestSolvedAt: null,
      },
      {
        teamName: "Ethan",
        score: 240,
        solved: 3,
        hintsUsed: 2,
        latestSolvedAt: "2025-04-05T20:04:14.706Z",
      },
      {
        teamName: "Flavian",
        score: 270,
        solved: 3,
        hintsUsed: 1,
        latestSolvedAt: "2025-04-05T20:33:22.844Z",
      },
    ];
    console.log(playersData);
  });
</script>

<!-- {#if $userId}
  <Database />
{:else}
  <Auth />
{/if} -->

<!-- <button on:click={uploadPuzzles}>Upload Puzzles</button> -->
<!-- <button on:click={getPlayerScores}>Get Player Data</button> -->

<Leaderboard {playersData} />
