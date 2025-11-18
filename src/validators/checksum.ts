import type { ValidatorFunction } from "../types";

const CHECKSUM_CONSTANT = "279146358279";

/**
 * Validates CNP checksum digit
 * Algorithm: multiply first 12 digits by constant digits, sum, modulo 11
 * If remainder is 10, checksum should be 1; otherwise checksum equals remainder
 *
 * @param cnp - Full 13-digit CNP string
 * @param checksum - Checksum digit (last digit of CNP)
 * @returns true if checksum is valid
 */
export const isChecksumValid: ValidatorFunction<string> = (
  cnp: string,
  checksum?: string,
): boolean => {
  const checksumDigit = checksum ?? cnp[12];
  const actualChecksum = parseInt(checksumDigit, 10);

  if (isNaN(actualChecksum)) return false;

  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnp[i], 10) * parseInt(CHECKSUM_CONSTANT[i], 10);
  }

  const remainder = sum % 11;
  const expectedChecksum = remainder === 10 ? 1 : remainder;

  return actualChecksum === expectedChecksum;
};
