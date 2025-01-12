<script lang="ts">
  import { onMount } from "svelte";
  import { REDIRECT_TO_PARAM } from "../auth/refresh/util";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  const params = page.url.searchParams;
  const url = params.has(REDIRECT_TO_PARAM) ? decodeURIComponent(params.get(REDIRECT_TO_PARAM) as string) : "/";

  onMount(() => {
    goto(url, { replaceState: true });
  });
</script>

<p>Redirecting...</p>

