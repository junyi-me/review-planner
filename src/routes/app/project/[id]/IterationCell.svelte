<script lang="ts">
  import Loading from "$lib/component/Loading.svelte";
  import type { IterationRow } from "$lib/server/db/schema";

  let { iteration: iterProp }: { iteration: IterationRow } = $props();
  let iteration = $state(iterProp);

  let editing = $state(false);
  let loading = $state(false);

  function save() {
    // TODO

    editing = false;
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 1000);
  }

  function toggleDone() {
    // TODO

    iteration.doneAt = iteration.doneAt ? null : new Date().toISOString().split("T")[0];
  }

  const today = new Date().toISOString().split("T")[0];
</script>

<td class:today={iteration.plannedAt === today} 
  class:done={iteration.doneAt !== null} 
  class:overdue={iteration.plannedAt < today && iteration.doneAt === null}>

  {#if loading}
    <Loading fullScreen={false} />
  {:else}
    {#if editing}
      <form onsubmit={save}>
        <label for="plannedAt">
          <i class="fas fa-calendar-alt"></i>
        </label>
        <input name="plannedAt" type="date" value={iteration.plannedAt} />
        {#if iteration.doneAt}
          <label for="doneAt">
            <i class="fas fa-check"></i>
          </label>
          <input name="doneAt" type="date" value={iteration.doneAt} />
        {/if}
        <button type="submit" aria-label="submit">
          <i class="fas fa-save"></i>
        </button>
        <button type="button" onclick={() => editing=false} aria-label="cancel">
          <i class="fas fa-times"></i>
        </button>
      </form>
    {:else}
      <div>
        {iteration.doneAt ?? iteration.plannedAt}
        <button aria-label="check" class:done={iteration.doneAt !== null} onclick={toggleDone}>
          <i class="fas fa-check"></i>
        </button>

        <button aria-label="edit" onclick={() => editing=true}>
          <i class="fas fa-edit"></i>
        </button>
      </div>
    {/if}
  {/if}
</td>

<style>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  button.done {
    background-color: green !important;
    color: white;
  }

  .fa-save {
    color: green;
  }

  .fa-times {
    color: red;
  }

  .today {
    background-color: #ffff99;
  }

  .overdue {
    background-color: #ff9999;
  }

  .done {
    background-color: #ccff99;
  }
</style>

