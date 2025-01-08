<script>
  import { onMount } from "svelte";
  import { REDIRECT_TO_PARAM } from "../auth/refresh/util";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  const url = page.url.searchParams.get(REDIRECT_TO_PARAM);

  onMount(() => {
    if (url) {
      goto(decodeURIComponent(url));
    } else {
      goto("/");
    }
  });
</script>

<p>Redirecting...</p>

