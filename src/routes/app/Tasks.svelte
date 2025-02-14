<script lang="ts">
  import { obtain, setIterDone } from "$lib/api.client";
  import Calendar from "$lib/component/calendar/Calendar.svelte";
  import type { CalEvent } from "$lib/component/calendar/util";
  import { setLoadingState, setToastState } from "$lib/store/global.svelte";
  import { strToDate } from "$lib/util";
  import type { GetCalendarTasksResp } from "./task/util";
  import { setReloadProjState } from "./util.svelte";

  let firstDate = $state<Date>();
  let lastDate = $state<Date>();
  let events: CalEvent[] = $state([]);
  $effect(() => {
    if (firstDate && lastDate) {
      updateEvents(firstDate, lastDate).then(e => {
        events = e;
      });
    }
  });

  async function updateEvents(from: Date, to: Date): Promise<CalEvent[]> {
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

    const calEvents: CalEvent[] = [];
    data.tasks.forEach((entry, entryIdx) => {
      const { task, projectId } = entry;
      task.iterations.forEach((iter, iterIdx) => {
        const e: CalEvent = {
          id: `${entryIdx}-${iterIdx}`,
          title: task.name,
          date: strToDate(iter.plannedAt),
          done: iter.done,
          links: [
            { url: `/app/task/${task.id}`, label: "Details" },
            { url: `/app/project/${projectId}`, label: "Project" },
          ],
          toggleDone: async () => {
            await setIterDone(task.id, iterIdx, !iter.done)
            iter.done = !iter.done; // for consecutive toggling
            events = events.map(ev => {
              if (ev.id === e.id) {
                ev.done = !ev.done;
              }
              return ev;
            });
            setReloadProjState(true);
          },
          iteration: iterIdx,
        }
        if (task.link) {
          e.links.push({ url: task.link, label: "", external: true });
        }
        calEvents.push(e);
      });
    });

    return calEvents;
  }
</script>

<Calendar bind:firstDate bind:lastDate {events} />

