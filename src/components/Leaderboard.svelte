<script>
  export let playersData = [];

  function getLatestTime(player) {
    if (!player.latestSolvedAt) return Infinity;
    return new Date(player.latestSolvedAt).getTime();
  }

  $: sortedScores = Array.isArray(playersData)
    ? [...playersData].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return getLatestTime(a) - getLatestTime(b); // Earlier is better
      })
    : [];
</script>

<div class="leaderboard-wrapper">
  <h2 class="title">🏆 Leaderboard</h2>
  <div class="table-scroll">
    <div class="table-wrapper">
      <table class="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Score</th>
            <th>Solved</th>
            <th>Hints</th>
          </tr>
        </thead>
        <tbody>
          {#each sortedScores as player, index}
            <tr class:gold={index === 0} class:silver={index === 1} class:bronze={index === 2}>
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
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  :global(body) {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    margin: 0;
    padding: 2rem;
  }

  .leaderboard-wrapper {
    max-width: 900px;
    margin: auto;
    background: #ffffff;
    border-radius: 1.25rem;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  }

  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 2rem;
    color: #0f172a;
  }

  .table-scroll {
    overflow-x: auto;
  }

  .table-wrapper {
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  table.leaderboard {
    width: 100%;
    border-collapse: collapse;
    min-width: 650px;
    font-size: 0.95rem;
  }

  thead {
    background: linear-gradient(to right, #6366f1, #60a5fa);
    color: white;
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 1rem;
    text-align: left;
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }

  tbody tr {
    transition: background 0.2s ease;
  }

  tbody tr:hover {
    background: #f1f5f9;
  }

  tbody tr.gold {
    background: linear-gradient(to right, #fde68a, #fcd34d);
    color: #92400e;
    font-weight: 700;
  }

  tbody tr.silver {
    background: linear-gradient(to right, #e5e7eb, #cbd5e1);
    color: #334155;
    font-weight: 600;
  }

  tbody tr.bronze {
    background: linear-gradient(to right, #fcd5ce, #f8c291);
    color: #7c2d12;
    font-weight: 600;
  }

  td:first-child {
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 640px) {
    th, td {
      padding: 0.75rem;
      font-size: 0.85rem;
    }
  }
</style>
