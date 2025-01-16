<script lang="ts">
  import type { ProjectMinIter } from "$lib/api";
  import DateCell from "$lib/component/DateCell.svelte";
  import { Td, Th, Tr } from "$lib/component/table";
  import Table from "$lib/component/table/table.svelte";
  import { formatDateLocale } from "$lib/util";

  let { projects: projectTasks }: { projects: ProjectMinIter[] } = $props();
</script>

<h2>Projects</h2>
<div class="striped">
  <Table>
    <thead>
      <tr>
        <Th>#</Th>
        <Th>Name</Th>
        <Th>Description</Th>
        <Th>Next iteration</Th>
        <Th>Created</Th>
      </tr>
    </thead>
    <tbody>
      {#if projectTasks.length === 0}
        <Tr>
          <Td colspan={99} class="nocontent">No projects</Td>
        </Tr>
      {/if}
      {#each projectTasks as pt, i}
        <Tr>
          <Td>{i + 1}</Td>
          <Td>
            <a href="/app/project/{pt.project.id}/">{pt.project.name}</a>
          </Td>
          <Td>{pt.project.description}</Td>
          <DateCell date={pt.task?.min_next_iter_at} done={false} />
          <Td>{formatDateLocale(pt.project.createdAt)}</Td>
        </Tr>
      {/each}
    </tbody>
  </Table>
</div>
<br />

<a href="/app/project/create">Create project</a>

