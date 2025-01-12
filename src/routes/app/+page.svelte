<script lang="ts">
  import type { GetProjectResp } from "$lib/api";
  import Dashboard from "./Dashboard.svelte";

  let { data }: { data: GetProjectResp } = $props();
</script>

<h1>Dashboard</h1>

<Dashboard projects={data.projects} />

