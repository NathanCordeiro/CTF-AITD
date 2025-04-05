<script>
  export let playersData = [];

  function getLatestTime(player) {
    if (!player.latestSolvedAt) return Infinity;
    return new Date(player.latestSolvedAt).getTime();
  }

  // Sort by score (desc), then by latestSolvedAt (asc)
  $: sortedScores = Array.isArray(playersData)
    ? [...playersData].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;

        const timeA = getLatestTime(a);
        const timeB = getLatestTime(b);
        return timeA - timeB; // earlier time wins
      })
    : [];
</script>

<div class="leaderboard-container">
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>Score</th>
        <th>Puzzles Solved</th>
        <th>Hints Used</th>
      </tr>
    </thead>
    <tbody>
      {#each sortedScores as player, index}
        <tr>
          <td>{index + 1}</td>
          <td>{player.teamName}</td>
          <td>{player.score}</td>
          <td>{player.solved}</td>
          <td>{player.hintsUsed}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  :global(body) {
    font-family: "Inter", sans-serif;
  }

  .leaderboard-container {
    margin-top: 2rem;
    overflow-x: auto;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    background: white;
    padding: 1rem;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 600px;
  }

  thead {
    background: linear-gradient(to right, #f9fafb, #f3f4f6);
    color: #1f2937;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    border-radius: 0.5rem;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
  }

  tbody tr {
    transition: background-color 0.2s ease;
  }

  tbody tr:hover {
    background-color: #f9fafb;
  }

  /* Rank colors */
  tbody tr:nth-child(1) {
    background-color: #fff8dc; /* Light gold */
    color: #bfa100;
    font-weight: 700;
  }

  tbody tr:nth-child(2) {
    background-color: #f0f0f5; /* Light silver */
    color: #a0a0a0;
    font-weight: 600;
  }

  tbody tr:nth-child(3) {
    background-color: #fbe8d3; /* Light bronze */
    color: #cc7722;
    font-weight: 600;
  }

  td:first-child {
    font-weight: 600;
  }

  @media (max-width: 640px) {
    th,
    td {
      padding: 0.75rem;
      font-size: 0.875rem;
    }
  }
</style>
