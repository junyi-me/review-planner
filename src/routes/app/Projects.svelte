<script lang="ts">
  import type { ProjectMinIter } from "$lib/api";
  import DateCell from "$lib/component/DateCell.svelte";
  import { Td, Thead, Tr } from "$lib/component/table";
  import Table from "$lib/component/table/table.svelte";
    import { setLoadingState } from "$lib/store/global.svelte";
  import { formatDateLocale } from "$lib/util";

  let { projects: projectTasks }: { projects: ProjectMinIter[] } = $props();

  const columns = [
    { key: "num", label: "#" },
    { key: "name", label: "Name", sortable: true },
    { key: "desc", label: "Description" },
    { key: "next", label: "Next iteration", sortable: true },
    { key: "created", label: "Created", sortable: true },
  ];

  async function handleSort(key: string, desc: boolean) {
    setLoadingState(true);

    console.log({ key, desc });

    // wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLoadingState(false);
  }
</script>

<h2>Projects</h2>
<div class="striped">
  <Table>
    <Thead {columns} onSort={handleSort} />
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

