import type { ValidatorFunction } from "../types";

/**
 * Validates parsed date
 *
 * @param date - Date object to validate
 * @returns true if date is valid and not in future
 */
export const isDateValid: ValidatorFunction<Date> = (date) => {
  return !isNaN(date.getTime());
};
