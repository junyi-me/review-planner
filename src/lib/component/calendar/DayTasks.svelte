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
      <li>
        <div>
          <button class="toggler" onclick={() => {
            event.toggleDone();
          }}>
            {#if event.done}
              ✅
            {:else}
              <i class="fa-regular fa-square"></i>
            {/if}
          </button>
          <span class:done={event.done}>
            {event.title}
          </span>
          <span class="iter">
            {event.iteration + 1}
          </span>
        </div>
        <div class="links">
          {#if event.links}
            {@render linkButton(event.links[0].url, event.links[0].label, true)}
          {/if}
          {#each event.links.slice(1) as entry}
            {@render linkButton(entry.url, entry.label, false, entry.external)}
          {/each}
        </div>
      </li>
    {/each}
  </ul>
{/if}

{#snippet linkButton(link: string, label: string, primary: boolean, external?: boolean)}
  <button class:primary={primary} class:secondary={!primary} onclick={() => {
    if (external) {
      window.open(link, "_blank");
    } else {
      goto(link);
    }
  }}>
    {#if external && !label}
      <i class="fas fa-external-link-alt"></i>
    {:else}
      {label}
    {/if}
  </button>
{/snippet}

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

  .done {
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

  .toggler {
    border: none;
    background: none;
    cursor: pointer;
    margin: 0;
    padding-right: 0;
  }

  .iter {
    background-color: var(--fg-1);
    color: var(--bg-1);
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>

