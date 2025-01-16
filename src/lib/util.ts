import type { TdStatus } from "./component/table";

export const DEFAULT_OFFSETS = [ 1, 3, 6 ];

export function formatDateLocale(date: Date): string {
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return formattedDate;
}

/**
  * Format a date to be used in an input[type=date]
  * @param date - The date to format
  * @returns The formatted date (yyyy-mm-dd)
  */
export function formatDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getCurrentDateInputFormat(): string {
  return formatDateInput(new Date());
}

/**
  * Parse a date string to a Date object, which becomes the exact date in string, 00:00:00 in local time zone
  * @param date - The date string to parse (yyyy-mm-dd)
  * @returns The Date object
  */
function strToDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  return dateObj;
}

/**
  * Format a date string to be displayed in the locale
  * @param dstr - The date string to format (yyyy-mm-dd)
  * @returns The formatted date
  */
export function formatStrDateLocale(dstr: string): string {
  return formatDateLocale(strToDate(dstr));
}

export async function getLinkFromClipboard(e: ClipboardEvent) {
  if (!e.clipboardData) return;

  const htmlText = e.clipboardData.getData("text/html");
  if (!htmlText) {
    return;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const anchor = doc.querySelector("a");
  if (!anchor) {
    return;
  }

  return anchor.href;
}

/**
  * Get the difference in days between two dates (date2 - date1)
  * @param date1 - The first date
  * @param date2 - The second date
  * @returns The difference in days
  */
export function getDateDiff(date1: string, date2: string) {
  // Parse the dates
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Calculate the difference in milliseconds
  // @ts-ignore
  const differenceInMs = d2 - d1;

  // Convert milliseconds to days
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return differenceInDays;
}

/**
  * Add an offset to a date
  * @param date - The date to add the offset to
  * @param offset - The offset to add
  * @returns The new date formatted by {@link formatDateInput}
  */
export function addOffsetToDate(date: string, offset: number): string {
  const newDate = strToDate(date);
  newDate.setDate(newDate.getDate() + offset);
  return formatDateInput(newDate);
}

/**
  * Get corresponding status for a date, to be rendered in a table cell
  * @param date - yyyy-mm-dd
  * @returns The status
  */
export function getDateStatus(date: string): TdStatus {
  const diff = getDateDiff(getCurrentDateInputFormat(), date);
  if (diff < 0) {
    return "danger";
  } else if (diff === 0) {
    return "warning";
  }
  return "normal";
}

