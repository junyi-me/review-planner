<script lang="ts">
  import type { ProjectRow, TaskRow } from "$lib/server/db/schema";

  type PageProps = {
    project: ProjectRow;
    task: TaskRow;
  };

  let { data }: { data: PageProps } = $props();
  let { project, task } = data;
</script>

<a href="/app/project/{project.id}/">Back to project</a>

<h1>{task.name}</h1>
{#if task.doneAt}
  <p>✅ {task.doneAt}</p>
{/if}

{#if task.link}
  <a href={task.link} target="_blank">{task.link}</a>
{/if}
<p>{task.description}</p>

<h2>Iterations</h2>
<div class="striped">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Planned</th>
        <th>Done</th>
      </tr>
    </thead>
    <tbody>
      {#each task.iterations as iter, i}
        <tr>
          <td>{i+1}</td>
          <td>{iter.plannedAt}</td>
          <td>{iter.done ? "✅" : "❌"}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

