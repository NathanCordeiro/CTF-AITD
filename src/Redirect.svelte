<script>
  import { navigate } from "svelte5-router";
  import { userId } from "./backend/auth";

  // Navigate on component mount
  $: {
    navigate($userId ? "/home" : "/login");
  }
</script>
