import Parser from "./Parser";

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
 * const cnp1 = new ParseCNP(1700101123456);
 *
 * // Without new (factory pattern)
 * const cnp2 = ParseCNP(1700101123456);
 * ```
 */
function ParseCNP(cnp: string | number): Parser {
  // @ts-ignore
  if (!(this instanceof Parser)) {
    return new Parser(cnp);
  }

  // @ts-ignore
  return this;
}

export default ParseCNP;
export { Parser };
export type { ParsedCNP, RawCNP, County, Sex } from "./types";
