<script lang="ts">
  import { validateProject, type ProjectPartial } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import { MAX_ITERATIONS } from "$lib/const";
  import { setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { getLinkFromClipboard } from "$lib/util";
  import { onMount } from "svelte";
  import AddButton from "../button/AddButton.svelte";
  import DeleteButton from "../button/DeleteButton.svelte";
  import { Table, Td, Tr } from "../table";

  let { project: initProj, onSave, onCancel }: {
    project: ProjectPartial;
    onSave: (id: number) => void;
    onCancel: () => void;
  }= $props();

  let project = $state({ ...initProj });
  const isNew = !initProj.id;

  function handleOffsetDayChange(i: number, e: Event) {
    const target = e.target as HTMLInputElement;
    project.offsetDays[i] = parseInt(target.value);
  }

  async function handleTitlePaste(e: ClipboardEvent) {
    const url = await getLinkFromClipboard(e);
    if (url) project.link= url;
  }

  async function save() {
    const err = validateProject(project);
    if (err) {
      alert(err);
      return;
    }

    setLoadingState(true);

    const resp = await obtain(undefined, {
      method: isNew ? "POST" : "PUT",
      body: JSON.stringify({ project }),
    });

    if (!resp.ok) {
      console.error("Failed to save", resp);
      setToastState({ type: "error", message: "Failed to save" });
      setTimeout(() => window.location.reload(), 500);
      return;
    }

    if (isNew) {
      const data = await resp.json();
      project.id = data.id;
    }

    setLoadingState(false);
    onSave(project.id!);
  }

  let titleEle: HTMLInputElement|null = null;
  onMount(() => titleEle && titleEle.focus());
</script>

<div class="container">
  <div class="inputs">
    <input class="title" type="text" bind:this={titleEle} value={project.name} onpaste={handleTitlePaste} oninput={e => project.name = (e.target as HTMLInputElement).value} />
    <br />
    <input type="text" bind:value={project.link} />
    <br />
    <textarea value={project.description} oninput={e => project.description = (e.target as HTMLTextAreaElement).value}></textarea>
  </div>

  <h2>Iterations</h2>
  <p>Default offset days for new tasks.</p>

  <div class="striped">
    <Table columns={[
      { key: "iter", label: "Iterations" },
      { key: "days", label: "+days" },
      { key: "actions", label: "Actions" },
    ]}>
      <tbody>
        <Tr>
          <Td>1</Td>
          <Td>0</Td>
          <Td></Td>
        </Tr>
        {#each project.offsetDays as offsetDay, i}
          <Tr>
            <Td>{i + 2}</Td>
            <Td>
              <input type="number" name="offsetDays" value={offsetDay} 
                onfocusin={e => (e.target as HTMLInputElement).select()} 
                onchange={e => handleOffsetDayChange(i, e)} />
            </Td>
            <Td>
              <DeleteButton onClick={() => project.offsetDays = project.offsetDays.filter((_, j) => j !== i)} />
            </Td>
          </Tr>
        {/each}
        <Tr>
          <Td colspan={99}>
            <AddButton label="Add iteration" onClick={() => project.offsetDays = [...project.offsetDays, 0]}
              disabled={project.offsetDays.length >= MAX_ITERATIONS - 1} />
          </Td>
        </Tr>
      </tbody>
    </Table>
  </div>
  <br />

  <button class="primary" onclick={save} aria-label="save">Save</button>
  <button class="secondary" onclick={() => { onCancel(); project = initProj; }} aria-label="cancel">Cancel</button>
</div>

<style>
  .container {
    padding-top: 1em;
  }

  .title {
    font-size: 1.5em;
    font-weight: bold;
  }

  .inputs input, textarea {
    margin-bottom: 1em;
    width: 100%;
  }

  textarea {
    height: 10em;
  }
</style>

