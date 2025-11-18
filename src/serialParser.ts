import type { ValidatorFunction } from "./types";

/**
 * Validates serial number (positions 10-12 of CNP)
 * Must be between 001 and 999 (inclusive)
 *
 * @param serial - 3-digit serial number string
 * @returns true if serial is in valid range
 */
const serialValidator: ValidatorFunction<string> = (serial) => {
  if (!/^\d{3}$/.test(serial)) return false;

  const num = parseInt(serial, 10);

  return !isNaN(num) && num > 0 && num <= 999;
};

export { serialValidator };
