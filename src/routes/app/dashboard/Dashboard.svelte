<script lang="ts">
  import type { ProjectRow } from "$lib/server/db/schema";

  let { projects }: { projects: ProjectRow[] } = $props();
</script>

<h2>Projects</h2>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Created</th>
    </tr>
  </thead>
  <tbody>
    {#each projects as project}
      <tr>
        <td>
          <a href="/app/project/{project.id}/">{project.name}</a>
        </td>
        <td>{project.description}</td>
        <td>{project.createdAt}</td>
      </tr>
    {/each}
  </tbody>
</table>

<a href="/app/project/create">Create project</a>

