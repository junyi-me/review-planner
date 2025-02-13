<script lang="ts">
  import { validateTask, type PutTaskReq, type TaskPartial } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import Loading from "$lib/component/Loading.svelte";
  import { MAX_ITERATIONS } from "$lib/const";
  import { loadingState, setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { addOffsetToDate, getDateDiff, getLinkFromClipboard } from "$lib/util";
  import { onMount } from "svelte";
  import AddButton from "../button/AddButton.svelte";
  import DeleteButton from "../button/DeleteButton.svelte";
  import { Table, Td, Tr } from "../table";
  import { convertIters, updateIterPlannedAt } from "./componentUtil";

  let { task: initTask, onSave, onCancel }: {
    task: TaskPartial,
    onSave: () => void 
    onCancel: () => void
  } = $props();
  let task = $state({ ...initTask });
  let iterations = $derived.by(() => convertIters(task.iterations));
  let offsets = $derived.by(() => iterations.map(iter => getDateDiff(iterations[0].plannedAt, iter.plannedAt)));

  async function handleTitlePaste(e: ClipboardEvent) {
    const url = await getLinkFromClipboard(e);
    if (url) task.link= url;
  }

  function addIteration() {
    const plannedAt = addOffsetToDate(iterations[iterations.length - 1].plannedAt, offsets[offsets.length - 1] * 2);
    task.iterations.push({ plannedAt, done: false });
  }

  function updatePlannedAt(i: number, e: Event) {
    const target = e.target as HTMLInputElement;
    task.iterations = updateIterPlannedAt(task.iterations, i, target.value);
  }

  function updateOffset(i: number, e: Event) {
    const target = e.target as HTMLInputElement;
    task.iterations[i].plannedAt = addOffsetToDate(iterations[0].plannedAt, parseInt(target.value));
  }

  async function save() {
    const err = validateTask(task);
    if (err) {
      alert(err);
      return;
    }

    setLoadingState(true);

    const body: PutTaskReq = { task };
    const resp = await obtain(undefined, {
      method: initTask.id ? "PUT" : "POST",
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.error("Failed to save", resp);
      setToastState({ type: "error", message: "Failed to save" });
      setTimeout(() => window.location.reload(), 500);
      return;
    }

    onSave();
    setLoadingState(false);
  }

  let titleEle: HTMLInputElement|null = null;
  onMount(() => titleEle && titleEle.focus());
</script>

{#if loadingState.loading}
  <Loading fullScreen={true} />
{/if}

<div class="container">
  <div class="inputs">
    <input class="title" type="text" bind:this={titleEle} value={task.name} onpaste={handleTitlePaste} oninput={e => task.name = (e.target as HTMLInputElement).value} />
    <br />
    <input type="text" bind:value={task.link} />
    <br />
    <textarea value={task.description} onchange={e => task.description = (e.target as HTMLTextAreaElement).value}></textarea>
  </div>

  <div class="table">
    <Table columns={[
      { key: "iter", label: "Iteration" },
      { key: "plannedAt", label: "Planned at" },
      { key: "done", label: "Done" },
      { key: "actions", label: "Actions" },
    ]}>
      <tbody>
        {#each iterations as iter, i}
          <Tr>
            <Td>{i + 1}</Td>
            <Td>
              <input type="date" value={iter.plannedAt} onchange={e => updatePlannedAt(i, e)} />
              &nbsp;
              {#if i > 0}
                <span>(+ 
                  <input value={offsets[i]} type="number" min="0" step="1"
                    onfocusin={e => (e.target as HTMLInputElement).select()} 
                    oninput={e => updateOffset(i, e)} />
                days)</span>
              {/if}
            </Td>
            <Td>
              <input type="checkbox" checked={iter.done} 
                onchange={(e) => task.iterations[i].done = (e.target as HTMLInputElement).checked} 
                disabled={!iter.canToggle} />
            </Td>
            <Td>
              <DeleteButton onClick={() => task.iterations.splice(i, 1)} />
            </Td>
          </Tr>
        {/each}
        <tr>
          {#if iterations.length < MAX_ITERATIONS}
            <Td colspan={99}>
              <AddButton label="Add iteration" onClick={addIteration} />
            </Td>
          {/if}
        </tr>
      </tbody>
    </Table>
  </div>

  <button class="primary" onclick={save} aria-label="save">Save</button>
  <button class="secondary" onclick={() => { onCancel(); task = initTask; }} aria-label="cancel">Cancel</button>
</div>

<style>
  .title {
    font-size: 1.5em;
    font-weight: bold;
  }

  .inputs input, textarea {
    margin-bottom: var(--gap-small);
    width: 100%;
  }

  textarea {
    height: 10em;
  }

  .table {
    margin-bottom: var(--gap-small);
  }
</style>

