export function formatDateOnly(dateInput) {
  const date = new Date(dateInput);
  return date.toISOString().substring(0, 10);
}