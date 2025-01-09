<script lang="ts">
  let { fullScreen = false }: { fullScreen?: boolean } = $props();
</script>

<div class="loading" class:fullScreen>
  <div class="spinner"></div>
</div>

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading.fullScreen {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    backdrop-filter: blur(5px);
  }

  .spinner {
    max-width: 100%;
    max-height: 100%;
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>

