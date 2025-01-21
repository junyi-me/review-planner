<script lang="ts">
  import { DEFAULT_PAGE_SIZE } from "$lib/const";

  const PAGE_RADIUS = 2;

  let {
    page: initPg = 1,
    pageSize = DEFAULT_PAGE_SIZE, // TODO
    totalPgs,
    onFlip,
  }: {
    page: number;
    pageSize: number;
    totalPgs: number;
    onFlip: (pg: number) => void;
  } = $props();

  let page = $state(initPg);
  function handlePgClick(pg: number) {
    page = pg;
    onFlip(pg);
  }

  function getPageSegment(center: number, radius: number) {
    const start = center - radius;
    const end = center + radius;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i).filter(pg => pg > 0 && pg <= totalPgs);
  }
  let segment = $derived(getPageSegment(page, PAGE_RADIUS));
</script>

<div class="pager">
  <button aria-label="first"
    disabled={page === 1}
    onclick={() => handlePgClick(1)}
  >
    <i class="fas fa-angle-double-left"></i>
  </button>

  <button aria-label="first"
    disabled={page === 1}
    onclick={() => handlePgClick(page - 1)}
  >
    <i class="fas fa-angle-left"></i>
  </button>

  {#each segment as pg}
    <button aria-label="first"
      class:active={pg === page}
      onclick={() => handlePgClick(pg)}
    >
      {pg}
    </button>
  {/each}

  <button aria-label="first"
    disabled={page === totalPgs}
    onclick={() => handlePgClick(page + 1)}
  >
    <i class="fas fa-angle-right"></i>
  </button>

  <button aria-label="first"
    disabled={page === totalPgs}
    onclick={() => handlePgClick(totalPgs)}
  >
    <i class="fas fa-angle-double-right"></i>
  </button>
</div>

<style>
  .pager {
    margin: 1em 0;
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }

  button {
    padding: 0.5em;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    background-color: #ddd;
  }

  button.active {
    background-color: #ddd;
  }
</style>

