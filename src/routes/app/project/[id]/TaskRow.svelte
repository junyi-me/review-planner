<script lang="ts">
  import type { TaskIterations } from "$lib/server/db/query";
  import IterationCell from "./IterationCell.svelte";

  let { task }: { task: TaskIterations } = $props();

  async function refreshIters() {
    window.location.reload(); // TODO
  }
</script>

<td>
  {#if task.doneAt}
    <span>✅</span>
  {/if}
  <a href="/app/task/{task.id}/">{task.name}</a>
  {#if task.link}
    <a href={task.link} target="_blank" aria-label="external">
      <i class="fas fa-external-link-alt">
    </a>
  {/if}
</td>
{#each task.iterations as iteration}
  <IterationCell {iteration} updateItersCallback={refreshIters} />
{/each}

