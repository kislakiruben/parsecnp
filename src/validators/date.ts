import { createValidationError, ERROR_CODES } from "./helpers";
import type { ValidationError } from "../types";

export function isDateValid(date: Date): boolean {
  return !isNaN(date.getTime());
}

export function validateDate(date: Date): ValidationError | null {
  if (!isDateValid(date)) {
    return createValidationError(
      "birthdate",
      ERROR_CODES.INVALID_DATE,
      "Invalid birth date",
    );
  }
  return null;
}
