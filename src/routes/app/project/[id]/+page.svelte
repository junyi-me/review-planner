<script lang="ts">
  import { goto } from '$app/navigation';
  import { obtain } from '$lib/api.client';
  import EditProject from '$lib/component/project/EditProject.svelte';
  import { Table, Td, Th, Thead, Tr } from '$lib/component/table';
  import { setLoadingState } from '$lib/store/global.svelte';
  import TaskRow from './TaskRow.svelte';
  import type { PageProps } from './util';

  let { data }: { data: PageProps } = $props();
  let { project, tasks } = data;

  let editing = $state(false);

  async function deleteProject() {
    if (!confirm("Are you sure you want to delete this project?")) {
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

    goto('/app');
  }

  const columns = [
    { key: "num", label: "#" },
    { key: "name", label: "Task", sortable: true },
    { key: "next_iter_at", label: "Iterations", sortable: true, sorting: true, colspan: 99 },
  ];
</script>

{#if !editing}
  <h1>{project.name}</h1>
  <p>{project.description}</p>

  <div class="striped">
    <Table>
      <Thead {columns}>
        <Tr>
          <Th>#</Th>
          <Th>Task</Th>
          <Th colspan={99}>Iterations</Th>
        </Tr>
      </Thead>
      <tbody>
        {#if tasks.length === 0}
          <Tr>
            <Td colspan={99} class="nocontent">No tasks</Td>
          </Tr>
        {/if}
        {#each tasks as task, i}
          <Tr>
            <Td>{i+1}</Td>
            <TaskRow {task} />
          </Tr>
        {/each}
      </tbody>
    </Table>
  </div>
  <br />

  <a href="/app/task/create?projId={project.id}">Create new task</a>
  <br />
  <br />

  <button onclick={() => editing = true}>Edit project</button>
  <button onclick={deleteProject}>Delete</button>
{:else}
  <EditProject {project} onSave={() => location.reload()} onCancel={() => editing = false} />
{/if}

