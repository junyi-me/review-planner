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
      border: 1px solid #ddd;
      padding: 8px;
  }

  .nocontent {
      color: #999;
      text-align: center;
  }

  .warning {
      background-color: #ffff99;
  }

  .danger {
      background-color: #ff9999;
  }

  .success {
      background-color: #ccff99;
  }
</style>

