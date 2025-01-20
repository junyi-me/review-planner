<script lang="ts">
  import { getPgParams, type PageOpts, type ProjectMinIter } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import DateCell from "$lib/component/DateCell.svelte";
  import { Td, Thead, Tr } from "$lib/component/table";
  import Table from "$lib/component/table/table.svelte";
  import { setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { formatDateLocale } from "$lib/util";
  import type { ProjectSortBy } from "./util";

  let { projects }: { projects: ProjectMinIter[] } = $props();
  let projectTasks = $state(projects);

  type SortColumn = {
    key: ProjectSortBy;
    label: string;
    sortable: boolean;
    sorting?: boolean;
  }
  type NonSortColumn = {
    key: string;
    label: string;
  }

  const columns: (SortColumn|NonSortColumn)[] = [
    { key: "num", label: "#" },
    { key: "name", label: "Project", sortable: true },
    { key: "desc", label: "Description" },
    { key: "min_next_iter_at", label: "Next iteration", sortable: true, sorting: true },
    { key: "createdAt", label: "Created", sortable: true },
  ];

  async function handleSort(key: string, desc: boolean) {
    setLoadingState(true);

    const pg: PageOpts = {
      page: 1, // TODO
      pageSize: 50, // TODO
      desc,
      sortBy: key,
      search: null, // TODO
    };
    const resp = await obtain(`/app?${getPgParams(pg)}`);

    if (!resp.ok) {
      console.error("Failed to sort", resp);
      setToastState({ type: "error", message: "Failed to sort" });
      setLoadingState(false);
      return;
    }

    const data = await resp.json();
    projectTasks = data.projects;
    setLoadingState(false);
  }
</script>

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

