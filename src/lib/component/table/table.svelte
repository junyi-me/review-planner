<script lang="ts">
	import type { HTMLTableAttributes } from "svelte/elements";

  let { children, ...restProps }: {
    children: any;
  } & HTMLTableAttributes = $props();
</script>

<div>
	<table {...restProps}>
		{@render children()}
	</table>
</div>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
</style>

