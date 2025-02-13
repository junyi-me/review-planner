<script lang="ts">
  import { obtain, setIterDone } from "$lib/api.client";
  import Calendar from "$lib/component/calendar/Calendar.svelte";
  import type { CalEvent } from "$lib/component/calendar/util";
  import { setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { strToDate } from "$lib/util";
  import type { GetCalendarTasksResp } from "./task/util";

  let { initEvents } : { initEvents?: CalEvent[] } = $props();

  async function getEvents(from: Date, to: Date): Promise<CalEvent[]> {
    setLoadingState(true);
    const resp = await obtain("/app/task", {
      method: "POST",
      body: JSON.stringify({ from, to }),
    });

    if (!resp.ok) {
      console.error("Failed to sort", resp);
      setToastState({ type: "error", message: "Failed to sort" });
      setLoadingState(false);
      throw new Error("Failed to sort");
    }
    
    const data = await resp.json() as GetCalendarTasksResp;
    setLoadingState(false);

    const events: CalEvent[] = [];
    data.tasks.forEach(entry => {
      const { task, projectId } = entry;
      task.iterations.forEach((iter, iterIdx) => {
        const e: CalEvent = {
          title: task.name,
          date: strToDate(iter.plannedAt),
          done: iter.done,
          links: [
            { url: `/app/task/${task.id}`, label: "Details" },
            { url: `/app/project/${projectId}`, label: "Project" },
          ],
          toggleDone: async () => setIterDone(task.id, iterIdx, !iter.done),
          iteration: iterIdx,
        }
        if (task.link) {
          e.links.push({ url: task.link, label: "", external: true });
        }
        events.push(e);
      });
    });

    return events;
  }
</script>

<Calendar {initEvents} {getEvents} />

