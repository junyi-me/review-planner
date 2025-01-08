<script>
  import { loggedIn } from "$lib/store/user.client";

  let { children } = $props();
</script>

<svelte:head>
  <title>Review Planner</title>
</svelte:head>

<div class="container">
  <nav>
    <a href="/">Top</a>
    {#if $loggedIn}
      <a href="/app">Dashboard</a>
    {/if}
  </nav>

  <nav>
    {#if $loggedIn}
      <a href="/auth/logout">Logout</a>
    {:else}
      <a href="/auth/login">Login</a>
    {/if}
  </nav>
</div>

{@render children()}

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>

