export function isValidDate(year: string | number, month: string, day: string): boolean {
  const yearNum = typeof year === "string" ? parseInt(year, 10) : year;
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);

  if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
    return false;
  }

  const date = new Date(yearNum, monthNum - 1, dayNum);
  const yearIsValid = yearNum === date.getFullYear();
  const monthIsValid = monthNum === date.getMonth() + 1;
  const dayIsValid = dayNum === date.getDate();

  return yearIsValid && monthIsValid && dayIsValid;
}
