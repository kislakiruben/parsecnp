/**
 * Parses checksum digit from CNP
 *
 * @param cnp - Full 13-digit CNP string
 * @returns Checksum digit string
 */
export const parseChecksum = (cnp: string): string => {
  return cnp[12];
};
