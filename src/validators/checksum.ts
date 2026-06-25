import { createValidationError, ERROR_CODES } from "./helpers";
import type { ValidationError } from "../types";

const CHECKSUM_CONSTANT = "279146358279";

const charAt = (s: string, i: number): string => s[i] ?? "";

function computeChecksum(cnp: string): number | null {
  const digit = cnp[12];
  const actualChecksum = digit ? parseInt(digit, 10) : NaN;
  if (isNaN(actualChecksum)) return null;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(charAt(cnp, i), 10) * parseInt(charAt(CHECKSUM_CONSTANT, i), 10);
  }
  const remainder = sum % 11;
  return remainder === 10 ? 1 : remainder;
}

export function isChecksumValid(cnp: string, checksum?: string): boolean {
  const digit = checksum ?? charAt(cnp, 12);
  const actual = parseInt(digit, 10);
  if (isNaN(actual)) return false;
  return actual === computeChecksum(cnp);
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
  const expectedChecksum = computeChecksum(cnp);
  if (actualChecksum !== expectedChecksum) {
    return createValidationError(
      "checksum",
      ERROR_CODES.INVALID_CHECKSUM,
      `Invalid checksum: expected ${expectedChecksum}, got ${actualChecksum}`,
    );
  }
  return null;
}
