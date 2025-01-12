<script lang="ts">
  import { goto } from "$app/navigation";
  import { obtain } from "$lib/api.client";
  import EditTask from "$lib/component/project/EditTask.svelte";
  import type { ProjectRow, TaskRow } from "$lib/server/db/schema";
  import { setLoadingState } from "$lib/store/global.svelte";

  type PageProps = {
    project: ProjectRow;
    task: TaskRow;
  };

  let { data }: { data: PageProps } = $props();
  let { task } = data;

  let editing = $state(false);

  async function deleteTask() {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setLoadingState(true);
    const resp = await obtain(undefined, {
      method: "DELETE",
    });

    setLoadingState(false);
    if (!resp.ok) {
      console.error("Failed to delete", resp);
      alert("Failed to delete");
      return;
    }

    goto(`/app/project/${task.projectId}`);
  }
</script>

{#if !editing}
  <h1>{task.name}</h1>
  {#if task.doneAt}
    <p>✅ {task.doneAt}</p>
  {/if}

  {#if task.link}
    <a href={task.link} target="_blank">{task.link}</a>
  {/if}
  <p>{task.description}</p>

  <h2>Iterations</h2>
  <div class="striped">
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Planned</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        {#each task.iterations as iter, i}
          <tr>
            <td>{i+1}</td>
            <td>{iter.plannedAt}</td>
            <td>{iter.done ? "✅" : "❌"}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <br />
  <button onclick={() => editing = true}>Edit</button>
  <button onclick={deleteTask}>Delete</button>
{:else}
  <EditTask {task} onSave={() => location.reload()} onCancel={() => editing = false} />
{/if}

