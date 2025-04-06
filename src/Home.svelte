<script>
  import { navigate } from "svelte5-router";
  import { logout, userId } from "./backend/auth";
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

  $: if ($userId) {
    fetchPlayerData();
  }
</script>

<div class="main-wrapper">
  <h1 class="gradient-title">🧩 Choose Your Puzzle</h1>

  {#if playerData}
    <div class="grid-wrapper">
      {#each Object.entries(playerData) as [puzzle, data]}
        <div
          class="card {data.solved ? 'solved' : 'unsolved'}"
          on:click={() => navigate(`/puzzle/${puzzle}/${data.description}`)}
        >
          <div class="card-glow" />
          <span>{puzzle}</span>
        </div>
      {/each}
    </div>
  {/if}

  <button class="logout" on:click={handleLogout}>🚪 Logout</button>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    font-family: 'Inter', sans-serif;
    color: #f8fafc;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-wrapper {
    width: 100%;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1.5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .gradient-title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(to right, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
    text-align: center;
  }

  .grid-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.5rem;
  }

  .card {
    position: relative;
    background: rgba(255, 255, 255, 0.08);
    padding: 1.5rem;
    border-radius: 1rem;
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: #f1f5f9;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
    border-radius: inherit;
    z-index: 0;
  }

  .card span {
    position: relative;
    z-index: 1;
  }

  .card.solved {
    background: linear-gradient(to right, #22c55e, #86efac);
    color: #0f172a;
    font-weight: 700;
  }

  .card.unsolved {
    background: linear-gradient(to right, #ef4444, #f87171);
    color: white;
  }

  .logout {
    background: linear-gradient(to right, #6366f1, #3b82f6);
    border: none;
    color: white;
    font-weight: 600;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .logout:hover {
    background: linear-gradient(to right, #4f46e5, #2563eb);
  }

  @media (max-width: 640px) {
    .gradient-title {
      font-size: 1.8rem;
    }

    .main-wrapper {
      padding: 2rem 1rem;
    }
  }
</style>
