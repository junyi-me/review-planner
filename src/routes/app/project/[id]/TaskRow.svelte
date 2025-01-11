<script lang="ts">
  import Loading from "$lib/component/Loading.svelte";
  import type { TaskRow } from "$lib/server/db/schema";
  import { setToastState } from "$lib/store/toast.svelte";
  import { formatStrDateLocale } from "$lib/util";

  let { task }: { task: TaskRow } = $props();
  let { iterations } = $state(task);

  let editing = $state(false);
  let loading = $state(false);

  const today = new Date().toISOString().split("T")[0];

  async function save() {
    editing = false;
    loading = true;

    await new Promise(resolve => setTimeout(resolve, 1000));

    setToastState({ type: "success", message: "Saved" });
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
{#each iterations as iteration}
  <td class:today={iteration.plannedAt === today} 
    class:done={iteration.done}
    class:overdue={iteration.plannedAt < today && !iteration.done}>

    {#if loading}
      <Loading fullScreen={false} />
    {:else}
      {#if editing}
        <form onsubmit={save}>
          {#if iteration.done}
            <label for="plannedAt">
              <i class="fas fa-check"></i>
            </label>
          {:else}
            <label for="plannedAt">
              <i class="fas fa-calendar-alt"></i>
            </label>
          {/if}
          <input name="plannedAt" type="date" bind:value={iteration.plannedAt} />

          <button type="submit" aria-label="submit">
            <i class="fas fa-save"></i>
          </button>
          <button type="button" onclick={() => editing=false} aria-label="cancel">
            <i class="fas fa-times"></i>
          </button>
        </form>
      {:else}
        <div>
          <span>{formatStrDateLocale(iteration.plannedAt)}</span>

          <span>
            <button aria-label="check" class:done={iteration.done} onclick={() => iteration.done = !iteration.done}>
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
{/each}

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

