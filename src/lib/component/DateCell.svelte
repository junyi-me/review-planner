<script lang="ts">
  import type { HTMLTdAttributes } from "svelte/elements";
  import { Td } from "./table";
  import { getDateStatus } from "$lib/util";

  let { date, done, children, ...restProps }: {
    date?: string;
    done: boolean;
    children?: any;
  } & HTMLTdAttributes = $props();
</script>

{#if !date}
  <Td status="normal" {...restProps}>(none)</Td>
{:else}
  <Td {...restProps} status={done ? "success" : getDateStatus(date)}>
    {#if children}
      {@render children()}
    {:else}
      {date}
    {/if}
  </Td>
{/if}

