<script lang="ts">
  import { isSameDate } from "$lib/util";
  import DateGrid from "./DateGrid.svelte";
  import DayTasks from "./DayTasks.svelte";
  import { getCalendarEdgeDays, type CalEvent } from "./util";

  let { 
    firstDate = $bindable(),
    lastDate = $bindable(),
    events,
  } : {
    firstDate?: Date;
    lastDate?: Date;
    events: CalEvent[];
  } = $props();
  
  const today = new Date();

  let current = $state(today);
  let year = $derived(current.getFullYear());
  let month = $derived(current.getMonth());
  let focus = $state(today);

  function getVisibleDays() {
    // Calculate the number of days in the previous month
    const end = new Date(year, month + 1, 0);
    const { prevMonthDays, nextMonthDays } = getCalendarEdgeDays(year, month);

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
  $effect(() => {
    firstDate = dates[0];
    lastDate = dates[dates.length - 1];
  });

  function updateFocus() {
    if (today.getMonth() === month && today.getFullYear() === year) {
      focus = today;
    } else {
      focus = new Date(year, month, 1);
    }
  }

  function prevMonth() {
    current = new Date(year, month - 1, 1);
    updateFocus();
  }

  function nextMonth() {
    current = new Date(year, month + 1, 1);
    updateFocus();
  }

  function toCurrentMonth() {
    current = today;
    updateFocus();
  }
</script>

<div class="container">
  <div class="calendar">
    <div class="calendar-header">
      <button onclick={prevMonth} aria-label="prevMonth">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button onclick={toCurrentMonth}>
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
          <div class="cell" 
            class:today={date && isSameDate(date, today)}
            class:foreign={date?.getMonth() !== month}
            onclick={() => focus = date} role="button" onkeydown={() => {}} tabindex={0}>
            <div class="dateLabel">
              {date?.getDate() ?? ""}
            </div>
            <DateGrid events={events.filter(e => isSameDate(e.date, date))} />
            {#if date && isSameDate(date, focus)}
              <div class="focusIndicator">
                <div class="focusEdge"></div>
                <div class="focusEdge"></div>
                <div class="focusEdge"></div>
                <div class="focusEdge"></div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div>
    <DayTasks date={focus} events={events.filter(e => isSameDate(e.date, focus))} />
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: var(--gap-small);
  }

  .calendar {
    color: var(--fg-1);
    width: fit-content;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    color: var(--bg-1);
    background-color: var(--fg-1);
    align-items: center;
  }

  .calendar-header button {
    background-color: transparent;
    color: var(--acc);
    border: none;
    padding: var(--gap-tiny);
    cursor: pointer;
    font-size: 1em;
  }

  .table { 
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .cell {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 9em;
    height: 9em;
    border-bottom: 1px solid var(--border);
    padding: 0.5em;
  }

  .head .cell {
    height: 2em;
  }

  .cell:nth-of-type(7n) {
    color: rgb(126, 139, 168);
  }

  .cell:nth-of-type(7n+1) {
    color: rgb(168, 126, 139);
    border-left: 1px solid var(--border);
  }

  .cell {
    border-right: 1px solid var(--border);
    position: relative;
    box-sizing: border-box;
  }

  .weekend {
    color: red;
  }

  .dateLabel {
    display: block;
    width: 1em;
    padding: 0.25em;
    border-radius: 50%;
    text-align: center;
  }

  .today .dateLabel {
    color: var(--bg-1);
    background-color: var(--fg-1);
  }

  .foreign {
    background-color: var(--bg-2);
  }

  .focusIndicator {
    position: absolute;
    top: 0em;
    left: 0em;
    right: 0em;
    bottom: 0em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 50%;
  }

  .focusEdge:nth-of-type(1), .focusEdge:nth-of-type(2) {
    border-top: 4px solid var(--fg-acc);
  }

  .focusEdge:nth-of-type(3), .focusEdge:nth-of-type(4) {
    border-bottom: 4px solid var(--fg-acc);
  }

  .focusEdge:nth-of-type(1), .focusEdge:nth-of-type(3) {
    border-left: 4px solid var(--fg-acc);
  }

  .focusEdge:nth-of-type(2), .focusEdge:nth-of-type(4) {
    border-right: 4px solid var(--fg-acc);
  }
</style>

