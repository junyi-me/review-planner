<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
  import { Th } from ".";

  type TableCol = {
    key: string;
    label: string;
    sortable?: boolean;
  }

  let { columns, onSort, ...restProps }: {
    columns: TableCol[];
    onSort?: (key: string, desc: boolean) => void;
  } & HTMLAttributes<HTMLTableSectionElement> = $props();
  
  let activeSortKey = $state<string | null>(null);

  function handleSortClick(key: string, desc: boolean) {
    activeSortKey = key;
    onSort?.(key, desc);
  }
</script>

<thead {...restProps}>
  {#each columns as { key, label, sortable }}
    <Th sortable={sortable} onSort={(desc) => handleSortClick(key, desc)} sorting={key === activeSortKey}>
      {label}
    </Th>
  {/each}
</thead>

<style>
  thead {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
  }
</style>

