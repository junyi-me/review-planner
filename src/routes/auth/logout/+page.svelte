<script>
  import { goto } from "$app/navigation";
  import { logout } from "$lib/store/user.client";
  import { onMount } from "svelte";

  onMount(() => {
    logout();
    goto("/");
  });
</script>

<p>Logging you out...</p>

