<script lang="ts">
  import type { GetProjectResp } from "$lib/api";
  import Projects from "./Projects.svelte";

  let { data }: { data: GetProjectResp } = $props();
</script>

<h1>Dashboard</h1>

<Projects projects={data.projects} />

