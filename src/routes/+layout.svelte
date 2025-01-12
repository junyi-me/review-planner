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
  <nav>
    <a href="/">Top</a>
    {#if $loggedIn}
      <a href="/app">Dashboard</a>
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

{@render children()}

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
</style>

