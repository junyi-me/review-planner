<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";
  import type { SortDirection } from ".";

  let { children, sortable = false, sorting, onSort, initDirection, ...restProps }: {
    children: any;
    sortable?: boolean; // column can be used for sorting
    sorting?: boolean; // table currently is sorted by this column
    onSort?: (desc: boolean) => void; // called when the column is clicked
    initDirection?: SortDirection; // initial sorting direction
  } & HTMLThAttributes = $props();

  let desc = $state(initDirection === "desc");
  $effect(() => {
    if (!sorting) {
      desc = true;
    }
  });

  function handleSortClick() {
    if (!sortable) return;
    desc = !desc;
    onSort?.(desc);
  }
</script>

<th {...restProps}>
  <button class="flexer" class:unsortable={!sortable} onclick={handleSortClick}>
    <div>
      {@render children()}
    </div>

    {#if sortable}
      <div class:active={sorting}>
        {#if desc}
          <i class="fas fa-sort-down"></i>
        {:else}
          <i class="fas fa-sort-up"></i>
        {/if}
      </div>
    {/if}
  </button>
</th>

<style>
  th {
    border: 1px solid var(--border);
    background-color: var(--fg-1);
    color: var(--bg-1);
  }

  .flexer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1em;
    color: var(--bg-1);
  }

  .flexer.unsortable {
    cursor: auto;
  }

  i {
    color: var(--fg-2);
  }

  div.active i {
    color: var(--fg-acc);
  }
</style>

