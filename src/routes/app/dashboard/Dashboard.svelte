<script lang="ts">
  import type { ProjectRow } from "$lib/server/db/schema";
  import { formatDateLocale } from "$lib/util";

  let { projects }: { projects: ProjectRow[] } = $props();
</script>

<h2>Projects</h2>
<div class="striped">
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Description</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {#if projects.length === 0}
        <tr>
          <td colspan={99} class="nocontent">No projects</td>
        </tr>
      {/if}
      {#each projects as project, i}
        <tr>
          <td>{i + 1}</td>
          <td>
            <a href="/app/project/{project.id}/">{project.name}</a>
          </td>
          <td>{project.description}</td>
          <td>{formatDateLocale(project.createdAt)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<a href="/app/project/create">Create project</a>

