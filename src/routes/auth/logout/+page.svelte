<script>
  import { goto } from "$app/navigation";
  import { localUser } from "$lib/store/user.client";
  import { onMount } from "svelte";

  onMount(() => {
    localUser.set(null);
    goto("/", { replaceState: true, invalidateAll: true });
  })
</script>

<p>Logging you out...</p>

