import { createValidationError, ERROR_CODES } from "./helpers";
import type { ValidationError } from "../types";

const CHECKSUM_CONSTANT = "279146358279";

const charAt = (s: string, i: number): string => s[i] ?? "";

export function isChecksumValid(cnp: string, checksum?: string): boolean {
  const checksumDigit = checksum ?? charAt(cnp, 12);
  const actualChecksum = parseInt(checksumDigit, 10);
  if (isNaN(actualChecksum)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(charAt(cnp, i), 10) * parseInt(charAt(CHECKSUM_CONSTANT, i), 10);
  }
  const remainder = sum % 11;
  return actualChecksum === (remainder === 10 ? 1 : remainder);
}

export function validateChecksum(
  cnp: string,
  checksum?: string,
): ValidationError | null {
  const checksumDigit = checksum ?? charAt(cnp, 12);
  const actualChecksum = parseInt(checksumDigit, 10);
  if (isNaN(actualChecksum)) {
    return createValidationError(
      "checksum",
      ERROR_CODES.INVALID_CHECKSUM,
      `Invalid checksum: must be a digit, got "${checksumDigit}"`,
    );
  }
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(charAt(cnp, i), 10) * parseInt(charAt(CHECKSUM_CONSTANT, i), 10);
  }
  const remainder = sum % 11;
  const expectedChecksum = remainder === 10 ? 1 : remainder;
  if (actualChecksum !== expectedChecksum) {
    return createValidationError(
      "checksum",
      ERROR_CODES.INVALID_CHECKSUM,
      `Invalid checksum: expected ${expectedChecksum}, got ${actualChecksum}`,
    );
  }
  return null;
}
