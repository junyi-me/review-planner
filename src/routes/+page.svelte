<script>
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { INVALIDATE_LOGIN_PARAM } from "./util";
  import { logout } from "$lib/store/user.client";
  import { goto } from "$app/navigation";

  const loggedOut = page.url.searchParams.has(INVALIDATE_LOGIN_PARAM);

  onMount(() => {
    if (loggedOut) {
      logout();
      goto("/");
    }
  });
</script>

<h1>Review Planner</h1>
<p>Description goes here.</p>

