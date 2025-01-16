<script lang="ts">
  import { validateTask, type PutTaskReq, type PutTaskResp } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import DateCell from "$lib/component/DateCell.svelte";
  import Loading from "$lib/component/Loading.svelte";
  import { convertIters, updateIterPlannedAt } from "$lib/component/project/componentUtil";
  import { Td } from "$lib/component/table";
  import type { Iteration, TaskRow } from "$lib/server/db/schema";
  import { loadingState, setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { formatStrDateLocale, getCurrentDateInputFormat } from "$lib/util";

  let { task: taskProps }: { task: TaskRow } = $props();
  let task = $state(taskProps);
  let iterations = $derived(task.iterations);

  type IterCanbeDone = Iteration & { canToggle: boolean };
  let iters: IterCanbeDone[] = $derived.by(() => convertIters(iterations));

  let showDetails = $state(false);

  async function toggleDone(i: number) {
    const today = getCurrentDateInputFormat();
    const iter = iterations[i];
    iter.done = !iter.done;
    if (iter.done && iter.plannedAt !== today) {
      if (confirm("Task is not planned for today. Mark as done today and adjust the future iterations?")) {
        task.iterations = updateIterPlannedAt(iterations, i, today);
      } else if (confirm("Mark as done today?")) {
        iter.plannedAt = today;
      }
    }

    const err = validateTask(task);
    if (err) {
      alert(err);
      return;
    }

    setLoadingState(true);
    const body: PutTaskReq = { task };
    const resp = await obtain(`/app/task/${task.id}/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.error("Failed to save", resp);
      setToastState({ type: "error", message: "Failed to save" });
      setTimeout(() => window.location.reload(), 500);
      return;
    }

    const data = await resp.json() as PutTaskResp;
    task.doneAt = data.doneAt;

    setLoadingState(false);
  }
</script>

{#if loadingState.loading}
  <Loading fullScreen={true} />
{/if}

<Td status={task.doneAt ? "success" : "normal"}>
  <a href="/app/task/{task.id}/">{task.name}</a>
  {#if task.link}
    <a href={task.link} target="_blank" aria-label="external">
      <i class="fas fa-external-link-alt">
    </a>
  {/if}
  {#if task.description}
    <button onclick={() => showDetails = !showDetails} aria-label="details">
      <i class="fas fa-caret-{showDetails ? 'up' : 'down'}">
    </button>
  {/if}
  <br />
  {#if showDetails}
    <p>{task.description ? task.description : "(No description)"}</p>
  {/if}
</Td>
{#each iters as iter, i}
  <DateCell date={iter.plannedAt} done={iter.done}>
    <div>
      <span>{formatStrDateLocale(iter.plannedAt)}</span>
      <span>
        {#if iter.canToggle}
          <button aria-label="check" class:done={iter.done} onclick={() => toggleDone(i)}>
            <i class="fas fa-check"></i>
          </button>
        {/if}
      </span>
    </div>
  </DateCell>
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
</style>

