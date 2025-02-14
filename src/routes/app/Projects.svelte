<script lang="ts">
  import { goto } from "$app/navigation";
  import { getPgParams, type PageOpts, type ProjectMinIter } from "$lib/api";
  import { obtain } from "$lib/api.client";
  import AddButton from "$lib/component/button/AddButton.svelte";
  import DateCell from "$lib/component/DateCell.svelte";
  import { Td, Tr } from "$lib/component/table";
  import Table from "$lib/component/table/table.svelte";
  import type { TableCol } from "$lib/component/table/util";
  import { DEFAULT_PAGE_SIZE, MIN_NEXT_ITER_AT } from "$lib/const";
  import { setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { formatDateLocale } from "$lib/util";
  import { reloadProjState, setReloadProjState } from "./util.svelte";

  let { projects, total }: { projects: ProjectMinIter[], total: number } = $props();
  let projectTasks = $state(projects);

  const columns: TableCol[] = [
    { key: "num", label: "#" },
    { key: "name", label: "Project", sortable: true },
    { key: "desc", label: "Description" },
    { key: "min_next_iter_at", label: "Next iteration", sortable: true, sorting: true },
    { key: "createdAt", label: "Created", sortable: true },
  ];

  const initPageOpts: PageOpts = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    desc: false,
    sortBy: MIN_NEXT_ITER_AT,
    search: null, // TODO
  };

  let pageOpts = $state(initPageOpts);
  async function handleSearch(pgOpts: PageOpts) {
    setLoadingState(true);
    pageOpts = pgOpts;

    const resp = await obtain(`/app?${getPgParams(pgOpts)}`);

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

  $effect(() => {
    if (reloadProjState.loading) {
      handleSearch(pageOpts);
      setReloadProjState(false);
    }
  });
</script>

<Table {columns} dtProps={{ onPageChange: handleSearch, total, initPageOpts }}>
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
          {#if pt.project.link}
            <a href={pt.project.link} target="_blank" aria-label="external">
              <i class="fas fa-external-link-alt">
            </a>
          {/if}
        </Td>
        <Td>{pt.project.description}</Td>
        <DateCell date={pt.task?.min_next_iter_at} done={false} />
        <Td>{formatDateLocale(pt.project.createdAt)}</Td>
      </Tr>
    {/each}
    <Tr>
      <Td colspan={99}>
        <AddButton onClick={() => goto("/app/project/create")} label="Create project" />
      </Td>
    </Tr>
  </tbody>
</Table>

