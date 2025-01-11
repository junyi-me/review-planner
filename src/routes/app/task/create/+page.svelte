<script lang="ts">
  import { goto } from "$app/navigation";
  import type { CreateTaskReq } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import Loading from "$lib/component/Loading.svelte";
  import { MAX_ITERATIONS } from "$lib/const";
  import type { ProjectRow } from "$lib/server/db/schema";
  import { setToastState } from "$lib/store/toast.svelte";
  import { formatDateInput, formatDateLocale, getLinkFromClipboard } from "$lib/util";

  let { data }: { data: { project: ProjectRow } } = $props();
  const project = data.project;

  let firstDate = $state(new Date());
  let offsets = $state([0, ...project.offsetDays]);

  let iterations: Date[] = $state([]);
  $effect(() => {
    iterations = offsets.map(offset => {
      const date = new Date(firstDate);
      date.setDate(date.getDate() + offset);
      return date;
    });
  });

  let loading = $state(false);
  async function handleSubmit(e: Event) {
    e.preventDefault();
    loading = true;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const body: CreateTaskReq = {
      name: formData.get("name") as string,
      projectId: project.id,
      link: formData.get("link")?.toString() ?? undefined,
      description: formData.get("description")?.toString() ?? undefined,
      iterations: iterations.map(date => date.toISOString().split("T")[0]),
    }

    const res = await obtain(undefined, { method: "POST", body: JSON.stringify(body) });
    if (!res.ok) {
      loading = false;
      setToastState({ type: "error", message: "Failed to create task" })
    }

    goto(`/app/project/${project.id}/`);
  }

  let linkInput: HTMLInputElement;
  async function handlePaste(e: ClipboardEvent) {
    const url = await getLinkFromClipboard(e);
    if (url) linkInput.value = url;
    setToastState({ type: "success", message: "Updated link" });
  }
</script>

{#if loading}
  <Loading />
{/if}

<h1>Create task</h1>
<p>For project <a href="/app/project/{project.id}/">{project.name}</a></p>

<form onsubmit={handleSubmit}>
  <label for="name">Name</label>
  <input name="name" type="text" onpaste={handlePaste} required />
  <br />

  <label for="description">Description</label>
  <textarea name="description"></textarea>
  <br />

  <label for="link">Link</label>
  <input name="link" type="url" bind:this={linkInput} />
  <br />
  <br />

  <h3>Iterations</h3>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Days elapsed</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each iterations as iter, i}
        <tr>
          <td>{i + 1}</td>
          {#if i === 0}
            <td>
              <input type="date" value={formatDateInput(firstDate)}
                onfocusin={e => (e.target as HTMLInputElement).select()}
                onchange={e => firstDate = new Date((e.target as HTMLInputElement).value)} />
            </td>
            <td>First time</td>
          {:else}
            <td>{formatDateLocale(iter)}</td>
            <td>
              +
              <input type="number" value={offsets[i]} 
                onfocusin={e => (e.target as HTMLInputElement).select()}
                onchange={e => offsets[i] = parseInt((e.target as HTMLInputElement).value)} />
              days
            </td>
            <td>
              <button type="button" onclick={() => offsets = offsets.filter((_, j) => j !== i)}>Remove</button>
            </td>
          {/if}
        </tr>
      {/each}
      <tr>
        <td></td>
        <td>
          <button type="button" 
            disabled={iterations.length >= MAX_ITERATIONS}
            onclick={() => offsets = [...offsets, 2*offsets[offsets.length-1]]}>
            Add iteration
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <br />
  <br />

  <button type="submit">Create task</button>
</form>

