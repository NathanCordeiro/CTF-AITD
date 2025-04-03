<script>
  import { login } from "./backend/authStore";

  let username = "";
  let password = "";

 
</script>

<h2>Login</h2>
<input type="text" bind:value={username} placeholder="Username" />
<input type="password" bind:value={password} placeholder="Password" />
<button on:click={() => login(username,password)}>Login</button>

