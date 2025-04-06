<script>
  import { login } from "./backend/auth";

  let username = "";
  let password = "";

  async function handleLogin() {
    if (!username || !password) {
      alert("Please enter a username and password");
      return;
    }
    const uid = await login(username, password);
    if (!uid) {
      alert("Incorrect username or password");
    }
  }
</script>

<div class="login-wrapper">
  <h1 class="login-title">🔐 Welcome Back</h1>

  <div class="login-box">
    <input type="text" bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleLogin}>Login</button>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    font-family: 'Inter', sans-serif;
    color: #f1f5f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1.5rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    text-align: center;
  }

  .login-title {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(to right, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
  }

  .login-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    padding: 0.9rem 1.2rem;
    font-size: 1rem;
    border-radius: 0.75rem;
    border: none;
    background: rgba(255, 255, 255, 0.08);
    color: white;
    outline: none;
    transition: background 0.3s;
  }

  input::placeholder {
    color: #cbd5e1;
  }

  input:focus {
    background: rgba(255, 255, 255, 0.12);
  }

  button {
    padding: 0.85rem;
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(to right, #6366f1, #3b82f6);
    color: white;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: linear-gradient(to right, #4f46e5, #2563eb);
  }

  @media (max-width: 480px) {
    .login-wrapper {
      margin: 0 1rem;
    }
  }
</style>
