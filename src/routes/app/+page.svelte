<script lang="ts">
  import type { GetProjectResp } from "$lib/api";
  import Projects from "./Projects.svelte";

  let { data }: { data: GetProjectResp } = $props();
</script>

<Projects projects={data.projects} total={data.total} />

