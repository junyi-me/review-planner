<script lang="ts">
  let { 
    onClick,
    label = "",
  }: {
    onClick: () => void;
    label?: string;
  } = $props();
</script>

<button class="secondary" onclick={onClick}>
  <i class="fas fa-edit"></i>
  {label}
</button>

