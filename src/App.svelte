<script>
  import { Router, Link, Route } from "svelte5-router";
  import Puzzle from "./Puzzle.svelte";
  import Home from "./Home.svelte";
  import Redirect from "./Redirect.svelte";
  import Login from "./Login.svelte";

  export let url = "";
</script>

<!-- App.svelte -->
<Router {url}>
  <Redirect />
  <div>
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/puzzle/:puzzleName/:puzzleDescription">
      {#snippet children(params)}
        <Puzzle puzzleName={params.puzzleName} puzzleDescription={params.puzzleDescription} />
      {/snippet}
    </Route>
  </div>
</Router>
