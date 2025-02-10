<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let { 
    onClick,
    label = "",
    ...restProps
  }: {
    onClick: () => void;
    label?: string;
  } & HTMLButtonAttributes = $props();
</script>

<button class="primary" onclick={onClick} {...restProps}>
  <i class="fas fa-plus"></i>
  {label}
</button>

