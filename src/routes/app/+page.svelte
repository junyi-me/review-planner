<script lang="ts">
  import type { GetProjectResp } from "$lib/api";
  import Projects from "./Projects.svelte";
  import Tasks from "./Tasks.svelte";

  let { data }: { data: GetProjectResp } = $props();
</script>

<div class="container">
  <Tasks />
  <Projects projects={data.projects} total={data.total} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-small);
  }
</style>

