<script>
  import Signup from "./Sigup.svelte";
  import Login from "./Login.svelte";
  import { user } from "./backend/authStore.js";

  let currentPage;
  let userName;

  function navigate(page) {
    currentPage = page;
  }

  // Subscribe to user store
  $: user.subscribe(value => {
    userName = value;
  });

</script>

{#if userName}
  <h1>{userName}</h1>
{/if}

<button on:click={() => navigate("signup")}>Sign Up</button>
<button on:click={() => navigate("login")}>Login</button>

{#if currentPage === "signup"}
  <Signup />
{/if}

{#if currentPage === "login"}
  <Login />
{/if}
