<script lang="ts">
  const today = new Date();

  let current = $state(today);
  let year = $derived(current.getFullYear());
  let month = $derived(current.getMonth());
  let start = $derived(new Date(year, month, 1));
  let end = $derived(new Date(year, month + 1, 0));
  $inspect(month)

  let dates = $derived([
     ...[...Array(start.getDay())].map(() => null),
     ...[...Array(end.getDate())].map((_, i) => new Date(year, month, i + 1))
  ]);

  function prevMonth() {
    current = new Date(year, month - 1, 1);
  }

  function nextMonth() {
    current = new Date(year, month + 1, 1);
  }
</script>

<div class="calendar">
  <div class="calendar-header">
    <button onclick={prevMonth}>
      {`◀︎`}
    </button>
    <button onclick={() => current = today}>
      {`${year} - ${`00${month + 1}`.slice(-2)}`}
    </button>
    <button onclick={nextMonth}>
      {`▶︎`}
    </button>
  </div>
  <div class="calendar-body">
    <div class="table">
      {#each ['S','M','T','W','T','F','S'] as weekday}        
        <div class="cell" class:weekend={weekday === 'S'}>
          {weekday}
        </div>
      {/each}
    </div>
    <div class="table">
      {#each dates as date}
        <div class="cell" class:today={date && date.toDateString() === today.toDateString()}>
          {date?.getDate() ?? ""}
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
    height: auto;
    aspect-ratio: 1 / 1;
    padding: 0.5em;
    height: 5em;
    border-bottom: 1px solid rgb(66,66,66);
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

  .weekend {
    color: red;
  }

  .today {
    color: #fff;
    background-color: rgb(66,66,66);
  }
</style>

