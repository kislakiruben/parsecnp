/**
 * Validates if a given date is real (e.g., no Feb 30)
 *
 * @param year - Full year (e.g., 1990)
 * @param month - Month (e.g., 5)
 * @param day - Day (e.g., 28)
 * @returns true if date is valid
 */
export const isValidDate = (
  year: string,
  month: string,
  day: string,
): boolean => {
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  const date = new Date(yearNum, monthNum - 1, dayNum);
  const yearIsValid = yearNum === date.getFullYear();
  const monthIsValid = monthNum === date.getMonth() + 1;
  const dayIsValid = dayNum === date.getDate();

  return yearIsValid && monthIsValid && dayIsValid;
};
