<script>
  import { signup, login, logout } from "../backend/auth";
  import { userId } from "../backend/auth";

  let username = "";
  let password = "";

  async function handleSignup() {
    if (!username || !password) {
      alert("Please enter a username and password");
      return;
    }
    const uid = await signup(username, password);
    if (uid) {
      alert("Signup Successful!");
    }
  }

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

  async function handleLogout() {
    await logout();
    alert("Logged Out!");
  }

  console.log();
</script>

<main>
  <h1>Firebase Auth</h1>

  <input type="text" bind:value={username} placeholder="Enter username" />
  <input type="password" bind:value={password} placeholder="Enter password" />

  <button on:click={handleSignup}>Sign Up</button>
  <button on:click={handleLogin}>Login</button>
  <button on:click={handleLogout}>Logout</button>
  <button on:click={()=>console.log(userId)}>Get Current User</button>
  
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
