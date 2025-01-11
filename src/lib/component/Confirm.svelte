<script lang="ts">
  let {
    title, 
    message, 
    onConfirm, 
    onCancel, 
    confirmText = "Confirm", 
    cancelText = "Cancel",
  }: {
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
    confirmText?: string,
    cancelText?: string,
  } = $props();
</script>

<div class="modal">
  <div class="modal-content">
    <h2>{title}</h2>
    <p>{message}</p>
    <div class="modal-buttons">
      <button onclick={onConfirm}>{confirmText}</button>
      <button onclick={onCancel}>{cancelText}</button>
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background-color: var(--bg-1);
    padding: var(--gap-medium);
    border-radius: var(--gap-small);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }
</style>

