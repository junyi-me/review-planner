<script lang="ts">
  import type { CalEvent } from "./util";

  let {
    events = [],
  } : {
    events?: CalEvent[];
  } = $props();

  let sortedEvents = $derived(events.slice().sort((a, b) => a.done === b.done ? 0 : a.done ? 1 : -1));
</script>

<div class="container">
  {#each sortedEvents.slice(0, 3) as event}
    <a class="event" class:done={event.done} href={event.links[0]?.url}>
      <span>
        {#if event.done}
          ✅
        {:else if event.date < new Date()}
          <i class="fas fa-exclamation-triangle"></i>
        {/if}
        {event.title}
      </span>
    </a>
  {/each}
  {#if events.length > 3}
    <span class="more">{events.length - 3} more...</span>
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
    color: var(--fg-1);
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    padding: 0;
    border: none;
    text-decoration: none;
  }

  .event.done span {
    text-decoration: line-through;
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

  .more {
    color: #666;
    font-size: 0.8em;
  }

  .fa-exclamation-triangle {
    color: #FFB200;
  }
</style>

