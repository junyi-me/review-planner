<script lang="ts">
  import type { IterationRow, ProjectRow, TaskRow } from "$lib/server/db/schema";

  type PageProps = {
    project: ProjectRow;
    task: TaskRow;
    iterations: IterationRow[];
  };

  let { data }: { data: PageProps } = $props();
  let { project, task, iterations } = data;
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
<table>
  <thead>
    <tr>
      <th>Planned</th>
      <th>Done</th>
    </tr>
  </thead>
  <tbody>
    {#each iterations as iter}
      <tr>
        <td>{iter.plannedAt}</td>
        <td>{iter.doneAt ?? "(Not yet)"}</td>
      </tr>
    {/each}
  </tbody>
</table>

