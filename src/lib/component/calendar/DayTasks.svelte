<script lang="ts">
  import { formatDateLocale } from "$lib/util";
  import type { CalEvent } from "./util";

  let { 
    date, 
    events,
  } : {
    date: Date,
    events: CalEvent[],
  } = $props();
</script>

<h2>{formatDateLocale(date)}</h2>

{#if events.length === 0}
  <p>No events</p>
{:else}
  <ul>
    {#each events as event}
      <li>
        {event.title}
        <div class="links">
          {#each event.links as entry}
            <span>
              <a href={entry.url}>{entry.label}</a>
              <i class="fas fa-external-link-alt"></i>
            </span>
          {/each}
        </div>
        {#if event.done}
          <span>✅</span>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .links {
    display: inline-flex;
    gap: 0.5em;
  }
</style>

