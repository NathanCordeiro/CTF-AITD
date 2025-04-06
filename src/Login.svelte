<script>
  import { signup, login } from "./backend/auth";
  import { userId } from "./backend/auth";

  let username = "";
  let password = "";

  async function handleLogin() {
    if (!username || !password) {
      alert("Please enter a username and password");
      return;
    }
    const uid = await login(username, password);
    if (uid) {
      alert("Login Successful!");
    }
  }
</script>

<main>
  <h1>Login</h1>

  <input type="text" bind:value={username} placeholder="Enter username" />
  <input type="password" bind:value={password} placeholder="Enter password" />

  <button on:click={handleLogin}>Login</button>
  <!-- console log userId -->
    <button on:click={() => console.log($userId)}>Get Current User</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    margin: auto;
  }

  input,
  button {
    padding: 10px;
    font-size: 16px;
  }
</style>
