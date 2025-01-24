<script lang="ts">
  import type { GetProjectResp } from "$lib/api";
  import Projects from "./Projects.svelte";
  import Tasks from "./Tasks.svelte";

  let { data }: { data: GetProjectResp } = $props();
</script>

<Tasks />
<Projects projects={data.projects} total={data.total} />

