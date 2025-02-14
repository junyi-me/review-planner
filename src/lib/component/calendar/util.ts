export type CalEvent = {
  id: string;
  title: string;
  date: Date;
  links: { label: string, url: string, external?: boolean }[];
  done: boolean;
  toggleDone: () => void;
  iteration: number;
}

/**
  * Get the number of days in the previous and next month
  * that are visible in the current month's calendar
  */
const numGrids = 35;
export function getCalendarEdgeDays(year: number, month: number) {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const prevMonthDays = start.getDay(); // Days to fill from the previous month
  const nextMonthDays = function() { // Days to fill from the next month
    let days = numGrids - prevMonthDays - end.getDate();
    if (days < 0) days += 7; // need one more row
    return days;
  }();
  return { prevMonthDays, nextMonthDays };
}

