<script lang="ts">
  import { goto } from "$app/navigation";
  import { obtain } from "$lib/api.client";
  import DeleteButton from "$lib/component/button/DeleteButton.svelte";
  import EditButton from "$lib/component/button/EditButton.svelte";
  import EditTask from "$lib/component/project/EditTask.svelte";
  import { Table, Td, Tr } from "$lib/component/table";
  import type { ProjectRow, TaskRow } from "$lib/server/db/schema";
  import { setLoadingState } from "$lib/store/global.svelte";
  import { formatStrDateLocale } from "$lib/util";

  type PageProps = {
    project: ProjectRow;
    task: TaskRow;
  };

  let { data }: { data: PageProps } = $props();
  let { task } = data;

  let editing = $state(false);

  async function deleteTask() {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setLoadingState(true);
    const resp = await obtain(undefined, {
      method: "DELETE",
    });

    setLoadingState(false);
    if (!resp.ok) {
      console.error("Failed to delete", resp);
      alert("Failed to delete");
      return;
    }

    goto(`/app/project/${task.projectId}`);
  }
</script>

{#if !editing}
  <a href="/app/project/{task.projectId}">
    <i class="fas fa-arrow-left"></i>
    Back to project
  </a>

  <h1>{task.name}</h1>
  {#if !task.nextIterAt}
    <p>✅ {task.lastIterAt}</p>
  {/if}

  {#if task.link}
    <a href={task.link} target="_blank">{task.link}</a>
  {/if}
  <p>{task.description}</p>

  <h2>Iterations</h2>
  <div class="striped">
    <Table columns={[
      { key: "num", label: "#" },
      { key: "plannedAt", label: "Planned at" },
      { key: "done", label: "Done" },
    ]}>
      <tbody>
        {#each task.iterations as iter, i}
          <Tr>
            <Td>{i+1}</Td>
            <Td>{formatStrDateLocale(iter.plannedAt)}</Td>
            <Td>{iter.done ? "✅" : "❌"}</Td>
          </Tr>
        {/each}
      </tbody>
    </Table>
  </div>

  <br />
  <EditButton onClick={() => editing = true} label="Edit" />
  <DeleteButton onClick={deleteTask} label="Delete" />
{:else}
  <EditTask {task} onSave={() => location.reload()} onCancel={() => editing = false} />
{/if}

