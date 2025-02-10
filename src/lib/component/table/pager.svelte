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
    if (pg === page) return;
    page = pg;
    onFlip(pg);
  }

  function getPageSegment(center: number, radius: number) {
    if (totalPgs <= 1) return [1];
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

  <button aria-label="prev"
    disabled={page === 1}
    onclick={() => handlePgClick(page - 1)}
  >
    <i class="fas fa-angle-left"></i>
  </button>

  {#each segment as pg}
    <button aria-label="cur"
      class:active={pg === page}
      onclick={() => handlePgClick(pg)}
    >
      {pg}
    </button>
  {/each}

  <button aria-label="next"
    disabled={page >= totalPgs}
    onclick={() => handlePgClick(page + 1)}
  >
    <i class="fas fa-angle-right"></i>
  </button>

  <button aria-label="last"
    disabled={page >= totalPgs}
    onclick={() => handlePgClick(totalPgs)}
  >
    <i class="fas fa-angle-double-right"></i>
  </button>
</div>

<style>
  .pager {
    margin: var(--gap-small) 0;
    display: flex;
    justify-content: center;
    gap: var(--gap-tiny);
  }

  button {
    padding: var(--gap-tiny);
    border: none;
    background-color: var(--bg-2);
    cursor: pointer;
    font-size: .8em;
  }

  button:disabled {
    color: var(--fg-3);
    cursor: not-allowed;
    background-color: var(--bg-2);
  }

  button.active {
    background-color: var(--bg-2);
    font-weight: bold;
  }
</style>

