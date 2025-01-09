<script lang="ts">
  import type { ProjectRow } from '$lib/server/db/schema';
  import IterationCell from './IterationCell.svelte';
  import type { TaskIterations } from './util';

  type PageProps = {
    project: ProjectRow;
    taskIters: TaskIterations[];
  };

  let { data }: { data: PageProps } = $props();
</script>

<h2>{data.project.name}</h2>
<p>{data.project.description}</p>

<h3>Tasks</h3>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th colspan={99}>Iterations</th>
    </tr>
  </thead>
  <tbody>
    {#each data.taskIters as task}
      <tr>
        <td>
          {#if task.doneAt}
            <span>✅</span>
          {/if}
          <a href="/app/task/{task.id}/">{task.name}</a>
          {#if task.link}
            <a href={task.link} target="_blank" aria-label="external">
              <i class="fas fa-external-link-alt">
            </a>
          {/if}
        </td>
        {#each task.iterations as iteration}
          <IterationCell {iteration} />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<a href="/app/task/create?projId={data.project.id}">Create new task</a>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>

