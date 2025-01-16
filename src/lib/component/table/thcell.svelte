<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";

  let { children, sortable = false, sorting, onSort, ...restProps }: {
    children: any;
    sortable?: boolean; // column can be used for sorting
    sorting?: boolean; // table currently is sorted by this column
    onSort?: (desc: boolean) => void; // called when the column is clicked
  } & HTMLThAttributes = $props();

  let desc = $state(true);
  $effect(() => {
    if (!sorting) {
      desc = true;
    }
  });

  function handleSortClick() {
    if (!sortable) return;

    if (sorting) desc = !desc;
    onSort?.(desc);
  }
</script>

<th {...restProps}>
  <button class="flexer" class:inactive={!sortable} onclick={handleSortClick}>
    <div>
      {@render children()}
    </div>

    {#if sortable}
      <div>
        {#if desc}
          <i class="fas fa-sort-down" class:inactive={!sorting}></i>
        {:else}
          <i class="fas fa-sort-up"></i>
        {/if}
      </div>
    {/if}
  </button>
</th>

<style>
  th {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
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
  }

  .flexer.inactive {
    cursor: auto;
  }

  i.inactive {
    color: #ddd;
  }
</style>

