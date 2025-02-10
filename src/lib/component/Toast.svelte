<script lang="ts">
  import { toastState } from "$lib/store/global.svelte";
  import { fade } from "svelte/transition";
  
  let cleanToast: NodeJS.Timeout;

  $effect(() => {
    if (toastState.type !== "done") {
      clearTimeout(cleanToast);
      cleanToast = setTimeout(() => {
        toastState.type = "done";
      }, 2000);
    }
  });
</script>

<div class="container">
  {#if toastState && toastState.type !== "done"}
    <div class="toast" class:error={toastState.type === "error"} transition:fade>
      <span>{toastState.message}</span>
    </div>
  {/if}
</div>

<style>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 1em;
    pointer-events: none;
  }

  .toast {
    z-index: 1002;
    position: fixed;
    background-color: #00cc00;
    color: var(--bg-1);
    padding: 1em 2em;
    border-radius: var(--gap-small);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .error {
    background-color: #ff8080;
  }
</style>

