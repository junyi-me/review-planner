<script lang="ts">
  import { goto } from '$app/navigation';
  import { getPgParams, type PageOpts } from '$lib/api';
  import { obtain } from '$lib/api.client';
  import AddButton from '$lib/component/button/AddButton.svelte';
  import DeleteButton from '$lib/component/button/DeleteButton.svelte';
  import EditButton from '$lib/component/button/EditButton.svelte';
  import EditProject from '$lib/component/project/EditProject.svelte';
  import { Table, Td, Tr } from '$lib/component/table';
  import { DEFAULT_PAGE_SIZE } from '$lib/const';
  import { setLoadingState, setToastState } from '$lib/store/global.svelte';
  import TaskRow from './TaskRow.svelte';
  import type { PageProps } from './util';

  let { data }: { data: PageProps } = $props();
  let { project, taskCount } = data;
  let tasks = $state(data.tasks);

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

  const initPageOpts = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    desc: false,
    sortBy: "next_iter_at",
    search: null,
  }
  let paging: PageOpts = $state(initPageOpts);

  async function handleSort(pg: PageOpts) {
    setLoadingState(true);

    paging = pg;
    const resp = await obtain(`/app/project/${project.id}?${getPgParams(pg)}`);

    if (!resp.ok) {
      console.error("Failed to sort", resp);
      setToastState({ type: "error", message: "Failed to sort" });
      setLoadingState(false);
      return;
    }

    const data = await resp.json();
    tasks = data.tasks;
    setLoadingState(false);
  }
</script>

<div class="container">
  {#if !editing}
    <div class="header">
      <h1>{project.name}</h1>
      <div>
        <EditButton onClick={() => editing = true} label="Edit" />
        <DeleteButton onClick={deleteProject} label="Delete" />
      </div>
    </div>
    <a href={project.link} target="_blank">{project.link}</a>
    <p>{project.description}</p>

    <div class="striped">
      <Table {columns} dtProps={{ onPageChange: handleSort, total: taskCount, initPageOpts }}>
        <tbody>
          {#if tasks.length === 0}
            <Tr>
              <Td colspan={99} class="nocontent">No tasks</Td>
            </Tr>
          {/if}
          {#each tasks as _, i}
            <Tr>
              <Td>{i + 1 + (paging.page - 1) * paging.pageSize}</Td>
              <TaskRow bind:task={tasks[i]} />
            </Tr>
          {/each}
          <Tr>
            <Td colspan={99}>
              <AddButton onClick={() => goto(`/app/task/create?projId=${project.id}`)} label="Create new task" />
            </Td>
          </Tr>
        </tbody>
      </Table>
    </div>
  {:else}
    <EditProject {project} onSave={() => location.reload()} onCancel={() => editing = false} />
  {/if}
</div>

<style>
  .container {
    padding-bottom: var(--gap-small);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

