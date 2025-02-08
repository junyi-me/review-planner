<script lang="ts">
  import type { CalEvent } from "./util";

  let {
    events = [],
  } : {
    events?: CalEvent[];
  } = $props();
</script>

<div class="container">
  {#each events.slice(0, 3) as event}
    <a class="event" href={event.links[0]?.url}>
      <span>
        {#if event.done}
          ✅
        {/if}
        {event.title}
      </span>
    </a>
  {/each}
  {#if events.length > 3}
    <span>...</span>
  {/if}
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }

  .event {
    border-radius: var(--gap-small);
    color: #000;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    padding: 0;
    border: none;
    background-color: rgba(255, 255, 255, 0);
  }

  .event span {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    text-decoration: underline;
  }
</style>

