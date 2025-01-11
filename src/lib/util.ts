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
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}

export function getCurrentDateInputFormat(): string {
  return formatDateInput(new Date());
}

export function formatStrDateLocale(dstr: string): string {
  return formatDateLocale(new Date(dstr));
}

export function formatStrDateInput(dstr: string): string {
  return formatDateInput(new Date(dstr));
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
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + offset);
  return formatDateInput(newDate);
}

