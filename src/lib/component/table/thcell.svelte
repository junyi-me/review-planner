<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";

  let { children, ...restProps }: {
    children: any;
  } & HTMLThAttributes = $props();
</script>

<th {...restProps}>
  {@render children()}
</th>

<style>
  th {
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
  }
</style>

