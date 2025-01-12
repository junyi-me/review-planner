<script lang="ts">
  import type { ProjectMinIter } from "$lib/api";
  import { formatDateLocale, getCurrentDateInputFormat } from "$lib/util";

  let { projects: projectTasks }: { projects: ProjectMinIter[] } = $props();

  const today = getCurrentDateInputFormat();
</script>

<h2>Projects</h2>
<div class="striped">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        <th>Next iteration</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {#if projectTasks.length === 0}
        <tr>
          <td colspan={99} class="nocontent">No projects</td>
        </tr>
      {/if}
      {#each projectTasks as pt, i}
        <tr>
          <td>{i + 1}</td>
          <td>
            <a href="/app/project/{pt.project.id}/">{pt.project.name}</a>
          </td>
          <td>{pt.project.description}</td>
          <td class:today={today === pt.task?.min_next_iter_at} class:overdue={pt.task && today > pt.task.min_next_iter_at}>
            {pt.task ? pt.task.min_next_iter_at : "(none)"}
          </td>
          <td>{formatDateLocale(pt.project.createdAt)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<br />

<a href="/app/project/create">Create project</a>

