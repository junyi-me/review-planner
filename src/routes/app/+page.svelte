<script lang="ts">
  import Dashboard from "./dashboard/Dashboard.svelte";
  import type { PageData } from "./util";

  let { data }: { data: PageData } = $props();
</script>

<h1>Dashboard</h1>

<Dashboard projects={data.projects} />

