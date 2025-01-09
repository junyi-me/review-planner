export const DEFAULT_OFFSETS = [ 1, 3, 6 ];

export function formatDateLocale(date: Date): string {
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  return formattedDate;
}

export function formatDateInput(date: Date): string {
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}

