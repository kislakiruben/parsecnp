import CnpParser from "./CnpParser";

/**
 * Factory function for creating CNP parser instances
 * Can be called with or without 'new' keyword
 *
 * @param CNP - 13-digit CNP string or number
 * @returns Parser instance
 *
 * @example
 * ```typescript
 * // With new
 * const cnp1 = new ParseCnp(1700101123456);
 *
 * // Without new (factory pattern)
 * const cnp2 = ParseCnp(1700101123456);
 * ```
 */
interface ParseCnpConstructor {
  (cnp: string | number): CnpParser;
  new (cnp: string | number): CnpParser;
}

const ParseCnp: ParseCnpConstructor = function (
  this: CnpParser | void,
  cnp: string | number,
): CnpParser {
  if (!(this instanceof CnpParser)) {
    return new CnpParser(cnp);
  }

  return this;
} as ParseCnpConstructor;

export default ParseCnp;
export type { ParsedCnp, RawCnp, County, Sex } from "./types";
