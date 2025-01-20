<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
  import { Th } from ".";

  type TableCol = {
    key: string;
    label: string;
    sortable?: boolean;
    colspan?: number;
    sorting?: boolean;
  }

  let { columns, onSort, ...restProps }: {
    columns: TableCol[];
    onSort?: (key: string, desc: boolean) => void;
  } & HTMLAttributes<HTMLTableSectionElement> = $props();
  
  let activeSortKey = $state<string | null>(columns.find(c => c.sorting)?.key ?? null);

  function handleSortClick(key: string, desc: boolean) {
    activeSortKey = key;
    onSort?.(key, desc);
  }
</script>

<thead {...restProps}>
  <tr>
    {#each columns as { key, label, sortable, colspan }}
      <Th sortable={sortable} onSort={(desc) => handleSortClick(key, desc)} sorting={key === activeSortKey} colspan={colspan}>
        {label}
      </Th>
    {/each}
  </tr>
</thead>

<style>
  thead {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
  }
</style>

