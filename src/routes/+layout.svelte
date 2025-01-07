<script>
  import { loggedIn } from "$lib/store/user.client";

  let { children } = $props();
</script>

<svelte:head>
  <title>Review Planner</title>
</svelte:head>

<nav>
  {#if $loggedIn}
    <a href="/">Top</a>
    <a href="/app">Dashboard</a>
    <a href="/auth/logout">Logout</a>
  {:else}
    <a href="/auth/login">Login</a>
    <a href="/auth/regist">Sign up</a>
  {/if}
</nav>

{@render children()}

