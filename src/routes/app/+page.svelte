<script lang="ts">
  import type { GetProjectResp } from "$lib/api";
    import Calendar from "$lib/component/Calendar.svelte";
  import Projects from "./Projects.svelte";

  let { data }: { data: GetProjectResp } = $props();
</script>

<h1>Calendar</h1>
<Calendar />

<h1>Projects</h1>
<Projects projects={data.projects} total={data.total} />

