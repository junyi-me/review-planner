<script lang="ts">
  import { goto } from "$app/navigation";
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
  <p class="nothing">Nothing for this day</p>
{:else}
  <ul>
    {#each events as event}
      <li class:done={event.done}>
        <span>
          {event.title}
        </span>
        <div class="links">
          {#each event.links as entry}
            <button class="secondary" onclick={() => goto(entry.url)}>
              {entry.label}
            </button>
          {/each}
        </div>
      </li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: var(--gap-small);
    align-items: center;
    padding: var(--gap-small) 0;
    border-bottom: 1px solid var(--border);
  }

  li.done span {
    text-decoration: line-through;
  }

  .links {
    display: flex;
    gap: var(--gap-tiny);
    flex-wrap: wrap;
  }

  .nothing {
    color: var(--fg-2);
  }
</style>

