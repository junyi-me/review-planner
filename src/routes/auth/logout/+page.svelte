<script>
  import { goto } from "$app/navigation";
  import { obtain } from "$lib/api.client";
  import { logout } from "$lib/store/user.client";
  import { onMount } from "svelte";

  onMount(async () => {
    const resp = await obtain("/auth/logout");
    if (!resp.ok) {
      alert("Failed to log out");
      return;
    }

    logout();
    goto("/");
  });
</script>

<p>Logging you out...</p>

