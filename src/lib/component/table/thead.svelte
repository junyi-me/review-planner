<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
  import { Th } from ".";
  import type { TableCol } from "./util";

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

