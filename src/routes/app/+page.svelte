<script lang="ts">
  import type { AppData } from "$lib/api";
    import { localUser } from "$lib/store/user.client";
  import Projects from "./Projects.svelte";
  import Tasks from "./Tasks.svelte";

  const { data }: { data: AppData } = $props();
  const { user, projects } = data;

  if (user) {
    localUser.set(user);
  }
</script>

<div class="container">
  <Tasks />
  <Projects projects={projects.projects} total={projects.total} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-small);
  }
</style>

