<script lang="ts">
  import TaskRow from './TaskRow.svelte';
  import type { PageProps } from './util';

  let { data }: { data: PageProps } = $props();
</script>

<h2>{data.project.name}</h2>
<p>{data.project.description}</p>

<h3>Tasks</h3>
<div class="striped">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th colspan={99}>Iterations</th>
      </tr>
    </thead>
    <tbody>
      {#if data.tasks.length === 0}
        <tr>
          <td colspan={99} class="nocontent">No tasks</td>
        </tr>
      {/if}
      {#each data.tasks as task, i}
        <tr>
          <td>{i+1}</td>
          <TaskRow {task} />
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<a href="/app/task/create?projId={data.project.id}">Create new task</a>

