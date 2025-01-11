<script lang="ts">
  import { obtain } from "$lib/api.client";
  import Loading from "$lib/component/Loading.svelte";
  import type { IterationRow } from "$lib/server/db/schema";
  import { setToastState } from "$lib/store/toast.svelte";
  import { formatStrDateLocale } from "$lib/util";

  let { 
    iteration: iterProp,
    updateItersCallback,
  }: { 
    iteration: IterationRow,
    updateItersCallback: () => void,
  } = $props();

  let savedIter = $state(iterProp);
  let iteration = $state(iterProp);

  let editing = $state(false);
  let loading = $state(false);

  function shouldAdjustIters() {
    if (iteration.plannedAt !== savedIter.plannedAt) return true; // planned date changed
    if (iteration.doneAt && savedIter.doneAt && iteration.doneAt !== savedIter.doneAt) return true; // done date changed
    if (savedIter.doneAt === null && iteration.doneAt !== null && savedIter.plannedAt !== iteration.doneAt) return true; // done, not on planned date
    if (savedIter.doneAt !== null && iteration.doneAt === null && savedIter.plannedAt !== savedIter.doneAt) return true; // undone, original done date not on planned date

    return false;
  }
  function confirmAdjustIters() {
    if (!shouldAdjustIters()) {
      return false;
    }
    return confirm("Planned date or done date has changed. Automatically adjust subsequent iterations?");
  }

  async function save() {
    editing = false;
    loading = true;

    const adjustIters = confirmAdjustIters();

    const resp = await obtain(`/app/iteration/${iteration.id}`, {
      method: "PUT",
      body: JSON.stringify({ iteration, adjustIters, }),
    });
    loading = false;

    if (!resp.ok) {
      console.error("Save failed", resp);
      setToastState({ type: "error", message: "Failed to save" })
      return;
    }

    savedIter = { ...iteration };
    if (adjustIters) updateItersCallback();
    setToastState({ type: "success", message: "Saved" });
  }

  async function toggleDone() {
    iteration.doneAt = iteration.doneAt ? null : new Date().toISOString().split("T")[0];
    await save();
  }

  const today = new Date().toISOString().split("T")[0];
</script>

<td class:today={savedIter.plannedAt === today} 
  class:done={savedIter.doneAt !== null} 
  class:overdue={savedIter.plannedAt < today && savedIter.doneAt === null}>

  {#if loading}
    <Loading fullScreen={false} />
  {:else}
    {#if editing}
      <form onsubmit={save}>
        <label for="plannedAt">
          <i class="fas fa-calendar-alt"></i>
        </label>
        <input name="plannedAt" type="date" bind:value={iteration.plannedAt} />
        {#if iteration.doneAt}
          <label for="doneAt">
            <i class="fas fa-check"></i>
          </label>
          <input name="doneAt" type="date" bind:value={iteration.doneAt} />
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
        <span>{iteration.doneAt ? formatStrDateLocale(iteration.doneAt) : formatStrDateLocale(iteration.plannedAt)}</span>

        <span>
          <button aria-label="check" class:done={savedIter.doneAt !== null} onclick={toggleDone}>
            <i class="fas fa-check"></i>
          </button>
          <button aria-label="edit" onclick={() => editing=true}>
            <i class="fas fa-edit"></i>
          </button>
        </span>
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

