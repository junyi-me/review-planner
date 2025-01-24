<script lang="ts">
  import { isSameDate } from "$lib/util";
  import DateGrid from "./DateGrid.svelte";
  import type { CalEvent } from "./util";

  let { 
    initEvents, 
    getEvents,
  } : {
    initEvents?: CalEvent[];
    getEvents?: (from: Date, to: Date) => Promise<CalEvent[]>;
  } = $props();

  const today = new Date();

  let current = $state(today);
  let year = $derived(current.getFullYear());
  let month = $derived(current.getMonth());

  const numGrids = 35;
  function getVisibleDays() {
    // Calculate the number of days in the previous month
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const prevMonthDays = start.getDay(); // Days to fill from the previous month
    const nextMonthDays = function() { // Days to fill from the next month
      let days = numGrids - prevMonthDays - end.getDate();
      if (days < 0) days += 7; // need one more row
      return days;
    }();

    // Calculate dates for the previous month
    const prevMonth = month - 1 < 0 ? 11 : month - 1;
    const prevMonthYear = month - 1 < 0 ? year - 1 : year;
    const prevMonthLastDate = new Date(prevMonthYear, prevMonth + 1, 0).getDate(); // Last day of the previous month

    // Calculate dates for the next month
    const nextMonth = month + 1 > 11 ? 0 : month + 1;
    const nextMonthYear = month + 1 > 11 ? year + 1 : year;

    return [
      // Days from the previous month
      ...[...Array(prevMonthDays)].map((_, i) => 
        new Date(prevMonthYear, prevMonth, prevMonthLastDate - prevMonthDays + i + 1)
      ),

      // Days in the current month
      ...[...Array(end.getDate())].map((_, i) => 
        new Date(year, month, i + 1)
      ),

      // Days from the next month
      ...((nextMonthDays > 0) ? [...Array(nextMonthDays)] : []).map((_, i) => 
        new Date(nextMonthYear, nextMonth, i + 1)
      ),
    ];
  }
  let dates = $derived.by(getVisibleDays);
  let firstDate = $derived(dates[0]);
  let lastDate = $derived(dates[dates.length - 1]);

  function prevMonth() {
    current = new Date(year, month - 1, 1);
  }

  function nextMonth() {
    current = new Date(year, month + 1, 1);
  }

  let events = $state(initEvents ?? []);
  $effect(() => {
    if (getEvents) {
      getEvents(firstDate, lastDate).then((newEvents) => {
        events = newEvents;
      });
    }
  });
  $inspect(events);
</script>

<div class="calendar">
  <div class="calendar-header">
    <button onclick={prevMonth} aria-label="prevMonth">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button onclick={() => current = today}>
      {`${year} - ${`00${month + 1}`.slice(-2)}`}
    </button>
    <button onclick={nextMonth} aria-label="nextMonth">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
  <div class="calendar-body">
    <div class="table head">
      {#each ['S','M','T','W','T','F','S'] as weekday}        
        <div class="cell" class:weekend={weekday === 'S'}>
          {weekday}
        </div>
      {/each}
    </div>
    <div class="table dates">
      {#each dates as date}
        <div class="cell" class:today={date && date.toDateString() === today.toDateString()}
          class:foreign={date?.getMonth() !== month}>
          <div class="dateLabel">
            {date?.getDate() ?? ""}
          </div>
          <DateGrid events={events.filter(e => isSameDate(e.date, date))} />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .calendar {
    color: rgb(66,66,66);
    width: fit-content;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    color: #fff;
    padding-bottom: 0.5em;
  }

  .calendar-header button {
    background-color: rgb(66,66,66);
    color: #fff;
    border: none;
    padding: 0.5em 0.75em;
    border-radius: 0.5em;
    cursor: pointer;
  }

  .table { 
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .cell {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 6em;
    height: 6em;
    border-bottom: 1px solid rgb(66,66,66);
    padding: 0.5em;
  }

  .head .cell {
    aspect-ratio: auto;
    height: 1.5em;
  }

  .cell:nth-of-type(7n) {
    color: rgb(126, 139, 168);
  }

  .cell:nth-of-type(7n+1) {
    color: rgb(168, 126, 139);
  }

  .cell:not(:nth-of-type(7n)) {
    border-right: 1px solid rgb(66,66,66);
  }

  .dates .cell:nth-last-of-type(-n+7) {
    border-bottom: none;
  }

  .weekend {
    color: red;
  }

  .dateLabel {
    display: block;
    width: fit-content;
    padding: 0.25em;
    border-radius: 50%;
  }

  .today .dateLabel {
    color: #fff;
    background-color: rgb(66,66,66);
  }

  .foreign {
    background-color: rgb(240, 240, 240);
  }
</style>

