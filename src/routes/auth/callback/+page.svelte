<script lang="ts">
  import { goto } from "$app/navigation";
  import type { UserInfo } from "$lib/api";
  import { localUser } from "$lib/store/user.client";
    import { onMount } from "svelte";

  const { data: user }: { data: UserInfo } = $props();

  onMount(() => {
    if (user) {
      localUser.set(user);
      goto("/app", { replaceState: true, invalidateAll: true });
    }
  });
</script>

<p>Logging you in...</p>

