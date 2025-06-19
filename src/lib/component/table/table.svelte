<script lang="ts">
	import type { HTMLTableAttributes } from "svelte/elements";
  import { DEFAULT_PAGE_SIZE } from "$lib/const";
  import type { TableCol } from "./util";
  import type { PageOpts } from "$lib/api";
  import { Pager, Thead } from ".";

  type DataTableProps = {
    onPageChange: (pg: PageOpts) => void;
    total: number;
    initPageOpts: PageOpts;
  }
  let { columns, dtProps, children, ...restProps }: {
    columns: TableCol[];
    dtProps?: DataTableProps;
    children: any;
  } & HTMLTableAttributes = $props();

  let pageOpts = $state(dtProps?.initPageOpts);
  function handlePageChange(pg: PageOpts) {
    pageOpts = pg;
    dtProps?.onPageChange?.(pg);
  }
</script>

<div>
	<table {...restProps}>
    {#if dtProps}
      <Thead {columns} onSort={(key, desc) => handlePageChange({ ...pageOpts!, sortBy: key, desc })} />
    {:else}
      <Thead {columns} />
    {/if}
		{@render children()}
	</table>
  {#if dtProps}
    <Pager page={1} pageSize={DEFAULT_PAGE_SIZE} 
      totalPgs={Math.ceil(dtProps.total / pageOpts!.pageSize)} 
      onFlip={pg => handlePageChange({ ...pageOpts!, page: pg })} />
  {/if}
</div>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
</style>

