<script lang="ts">
  import type { HTMLTdAttributes } from "svelte/elements";
  import type { TdStatus } from ".";

  let { children, status, ...restProps }: {
    children?: any;
    status?: TdStatus;
  } & HTMLTdAttributes = $props();
</script>

<td class:normal={status === "normal"} class:warning={status === "warning"} 
  class:danger={status === "danger"} class:success={status === "success"} {...restProps}>
  {@render children?.()}
</td>

<style>
  td {
      border: 1px solid var(--border);
      padding: var(--gap-tiny);
  }

  .nocontent {
      color: var(--fg-3);
      text-align: center;
  }

  .warning {
      background-color: var(--bg-warn);
  }

  .danger {
      background-color: var(--bg-danger);
  }

  .success {
      background-color: var(--bg-success);
  }
</style>

