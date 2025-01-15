<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

  let { children, ...restProps }: {
    children: any;
  } & HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr {...restProps}>
  {@render children()}
</tr>

<style>
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
</style>

