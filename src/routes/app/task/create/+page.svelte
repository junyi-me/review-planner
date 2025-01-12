<script lang="ts">
  import { goto } from "$app/navigation";
  import EditTask from "$lib/component/project/EditTask.svelte";
  import type { ProjectRow } from "$lib/server/db/schema";
  import { addOffsetToDate, getCurrentDateInputFormat } from "$lib/util";

  let { data }: { data: { project: ProjectRow } } = $props();
  const project = data.project;

  const today = getCurrentDateInputFormat();
  const defaultIters = [0, ...project.offsetDays].map(offset => ({ plannedAt: addOffsetToDate(today, offset), done: false }));

  const gotoProject = () => goto(`/app/project/${project.id}`);
</script>

<EditTask task={{ projectId: project.id, name: "", link: "", iterations: defaultIters }} onSave={gotoProject} onCancel={gotoProject} />

