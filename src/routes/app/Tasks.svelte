<script lang="ts">
  import Calendar from "$lib/component/calendar/Calendar.svelte";
  import type { CalEvent } from "$lib/component/calendar/util";

  let { initEvents } : { initEvents?: CalEvent[] } = $props();

  async function getEvents(from: Date, to: Date): Promise<CalEvent[]> {
    console.log("getEvents", from, to);
    return [
      { id: 1, title: "Event 1", date: new Date(2025, 0, 20) },
      { id: 2, title: "Event 2", date: new Date(2025, 0, 21) },
      { id: 3, title: "Event 3", date: new Date(2025, 0, 22) },
    ];
  }
</script>

<h1>Calendar</h1>
<Calendar {initEvents} {getEvents} />

