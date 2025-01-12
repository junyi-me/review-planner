<script lang="ts">
  import { goto } from "$app/navigation";
  import EditProject from "$lib/component/project/EditProject.svelte";
  import { DEFAULT_OFFSETS } from "$lib/util";
</script>

<EditProject project={{ name: "", offsetDays: DEFAULT_OFFSETS }} 
  onSave={id => goto(`/app/project/${id}`)}
  onCancel={() => goto("/app")} />

