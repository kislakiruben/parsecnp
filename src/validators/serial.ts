import { createValidationError, ERROR_CODES } from "./helpers";
import type { ValidationError } from "../types";

export function isSerialValid(serial: string): boolean {
  if (!/^\d{3}$/.test(serial)) return false;
  const num = parseInt(serial, 10);
  return !isNaN(num) && num > 0 && num <= 999;
}

export function validateSerial(serial: string): ValidationError | null {
  if (!isSerialValid(serial)) {
    const num = parseInt(serial, 10);
    const extraInfo =
      !isNaN(num) && num === 0 ? " (000 is not allowed)" : "";
    return createValidationError(
      "serial",
      ERROR_CODES.INVALID_SERIAL,
      `Invalid serial number: must be 001-999, got "${serial}"${extraInfo}`,
    );
  }
  return null;
}
