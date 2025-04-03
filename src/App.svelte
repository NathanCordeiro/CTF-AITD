<script>
  import Auth from "./components/Auth.svelte";
  import Database from "./components/Database.svelte";
  import { uploadPuzzles } from "./backend/setup";
  import { userId } from "./backend/auth";
</script>

{#if $userId}
  <Database />
{:else}
  <Auth />
{/if}

<!-- <button on:click={uploadPuzzles}>Upload Puzzles</button> -->
