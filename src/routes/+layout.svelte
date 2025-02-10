<script>
  import { navigating } from "$app/state";
  import Loading from "$lib/component/Loading.svelte";
  import Toast from "$lib/component/Toast.svelte";
  import { loadingState } from "$lib/store/global.svelte";
  import { loggedIn } from "$lib/store/user.client";
  import '@fortawesome/fontawesome-free/css/all.min.css'

  let { children } = $props();
</script>

<svelte:head>
  <title>Review Planner</title>
</svelte:head>

<Toast />

{#if navigating.type || loadingState.loading}
  <Loading fullScreen />
{/if}

<div class="container">
  <div class="nav-container">
    <nav>
      <img src="/favicon.webp" alt="logo" width="32" height="32" />
      {#if $loggedIn}
        <a href="/app">Dashboard</a>
      {:else}
        <a href="/">Top</a>
      {/if}
    </nav>

    <nav>
      {#if $loggedIn}
        <a href="/auth/logout" data-sveltekit-preload-data="off">Logout</a>
      {:else}
        <a href="/auth/login">Login</a>
      {/if}
    </nav>
  </div>

  <div class="page-content">
    {@render children()}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    padding: var(--gap-tiny);
    gap: var(--gap-small);
    background-color: var(--fg-1);
  }

  nav {
    display: flex;
    gap: var(--gap-small);
  }

  nav a {
    color: var(--bg-1);
    display: flex;
    align-items: center;
  }

  .page-content {
    padding: var(--gap-small);
    height: 100%;
  }
</style>

