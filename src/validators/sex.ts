import { createValidationError, ERROR_CODES } from "./helpers";
import type { ValidationError } from "../types";

const VALID_SEX_CODES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function isSexValid(sexCode: string): boolean {
  const code = parseInt(sexCode, 10);
  return !isNaN(code) && VALID_SEX_CODES.includes(code);
}

export function validateSex(sexCode: string): ValidationError | null {
  if (!isSexValid(sexCode)) {
    return createValidationError(
      "sex",
      ERROR_CODES.INVALID_SEX,
      `Invalid sex code: must be 1-9, got "${sexCode}"`,
    );
  }
  return null;
}
