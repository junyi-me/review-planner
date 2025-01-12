<script lang="ts">
  import EditProject from '$lib/component/project/EditProject.svelte';
  import TaskRow from './TaskRow.svelte';
  import type { PageProps } from './util';

  let { data }: { data: PageProps } = $props();
  let { project, tasks } = data;

  let editing = $state(false);
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
{:else}
  <EditProject {project} onSave={() => location.reload()} onCancel={() => editing = false} />
{/if}

