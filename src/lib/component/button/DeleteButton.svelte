<script lang="ts">
  let { 
    onClick,
    label = "",
  }: {
    onClick: () => void;
    label?: string;
  } = $props();
</script>

<button class="danger" onclick={onClick}>
  <i class="fas fa-trash"></i>
  {label}
</button>

