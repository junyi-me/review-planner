<script lang="ts">
  import { goto } from '$app/navigation';
  import { obtain } from '$lib/api.client';
  import EditProject from '$lib/component/project/EditProject.svelte';
  import { setLoadingState } from '$lib/store/global.svelte';
  import TaskRow from './TaskRow.svelte';
  import type { PageProps } from './util';

  let { data }: { data: PageProps } = $props();
  let { project, tasks } = data;

  let editing = $state(false);

  async function deleteProject() {
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

    goto('/app');
  }
</script>

{#if !editing}
  <h1>{project.name}</h1>
  <p>{project.description}</p>

  <h2>Tasks</h2>
  <div class="striped">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th colspan={99}>Iterations</th>
        </tr>
      </thead>
      <tbody>
        {#if tasks.length === 0}
          <tr>
            <td colspan={99} class="nocontent">No tasks</td>
          </tr>
        {/if}
        {#each tasks as task, i}
          <tr>
            <td>{i+1}</td>
            <TaskRow {task} />
          </tr>
        {/each}
      </tbody>
    </table>
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

