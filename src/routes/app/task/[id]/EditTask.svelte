<script lang="ts">
  import type { PutTaskReq, PutTaskResp } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import Loading from "$lib/component/Loading.svelte";
  import { MAX_ITERATIONS } from "$lib/const";
  import type { TaskRow } from "$lib/server/db/schema";
  import { loadingState, setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { getCurrentDateInputFormat, getLinkFromClipboard } from "$lib/util";
  import { convertIters } from "../../project/[id]/util";

  let { task: initTask, onSave, onCancel }: {
    task: TaskRow, 
    onSave: (t: TaskRow) => void 
    onCancel: () => void
  } = $props();
  let task = $state({ ...initTask });
  let iterations = $derived.by(() => convertIters(task.iterations));

  let linkInput: HTMLInputElement;
  async function handlePaste(e: ClipboardEvent) {
    const url = await getLinkFromClipboard(e);
    if (url) linkInput.value = url;
  }

  async function save() {
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
    onSave(task);

    setLoadingState(false);
  }
</script>

{#if loadingState.loading}
  <Loading fullScreen={true} />
{/if}

<div class="container">
  <input class="title" type="text" value={task.name} onpaste={handlePaste} oninput={e => task.name = (e.target as HTMLInputElement).value} />
  <br />
  <input type="text" value={task.link} bind:this={linkInput} oninput={e => task.link = (e.target as HTMLInputElement).value} />
  <br />
  <textarea value={task.description} oninput={e => task.description = (e.target as HTMLTextAreaElement).value}></textarea>

  <div class="striped">
    <table>
      <thead>
        <tr>
          <th>Iteration</th>
          <th>Planned at</th>
          <th>Done</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each iterations as iter, i}
          <tr>
            <td>{i + 1}</td>
            <td>
              <input type="date" value={iter.plannedAt} onchange={e => task.iterations[i].plannedAt = (e.target as HTMLInputElement).value} />
            </td>
            <td>
              <input type="checkbox" checked={iter.done} 
                onchange={(e) => task.iterations[i].done = (e.target as HTMLInputElement).checked} 
                disabled={!iter.canToggle} />
            </td>
            <td>
              <button onclick={() => task.iterations.splice(i, 1)} aria-label="delete">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        {/each}
        <tr>
          {#if iterations.length < MAX_ITERATIONS}
            <td colspan="99">
              <button onclick={() => task.iterations.push({ plannedAt: getCurrentDateInputFormat(), done: false })} aria-label="add">Add iteration</button>
            </td>
          {/if}
        </tr>
      </tbody>
    </table>
  </div>

  <button onclick={save} aria-label="save">Save</button>
  <button onclick={() => { onCancel(); task = initTask; }} aria-label="cancel">Cancel</button>
</div>

<style>
  .container {
    padding-top: 1em;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
  }

  input:not([type=date]), textarea, table {
    margin-bottom: 1em;
    width: 100%;
  }

  textarea {
    height: 10em;
  }
</style>

