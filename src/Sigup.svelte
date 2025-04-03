
<script>
    import { signup } from "./backend/authStore";
    let username = "";
    let password = "";

    
</script>

<h2>Sign Up</h2>
<input type="text" bind:value={username} placeholder="Username" />
<input type="password" bind:value={password} placeholder="Password" />
<button on:click={() => signup(username,password)}>Sign Up</button>

