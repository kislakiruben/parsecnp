/**
 * Sex code indicator (first digit of CNP)
 * - 1: Male, 1900-1999
 * - 2: Female, 1900-1999
 * - 3: Male, 1800-1899
 * - 4: Female, 1800-1899
 * - 5: Male, 2000-2099
 * - 6: Female, 2000-2099
 * - 7: Male resident (foreign-born)
 * - 8: Female resident (foreign-born)
 * - 9: Not applicable (special cases)
 */
export type SexCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Sex code as string (when extracted from CNP)
 */
export type SexCodeString = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

/**
 * Parsed sex value
 */
export type Sex = "male" | "female" | "not known" | "not applicable";

/**
 * County code (positions 8-9 of CNP)
 * Valid range: "01"-"52" with some gaps
 */
export type CountyCode = string;

/**
 * ISO 3166-2:RO county code (e.g., "AB", "CJ", "B")
 */
export type CountyISO = string;

/**
 * County information
 */
export interface County {
  code: CountyCode;
  name: string;
  ISO: CountyISO;
}

/**
 * Raw CNP components extracted from the 13-digit string
 */
export interface RawCnp {
  cnp: string;
  sex: SexCodeString;
  birthdate: string;
  county: CountyCode;
  serial: string;
  checksum: string;
}

/**
 * Parsed CNP data (public API)
 */
export interface ParsedCnp {
  /** Biological sex */
  readonly sex: Sex;
  /** Birth date as Date object */
  readonly birthdate: Date;
  /** Birth year */
  readonly year: number;
  /** Birth month (1-12) */
  readonly month: number;
  /** Birth day (1-31) */
  readonly day: number;
  /** County information */
  readonly county: County;
  /** Serial number string */
  readonly serial: string;
  /** Checksum digit string */
  readonly checksum: string;
  /** Whether CNP passes all validation checks */
  readonly isValid: boolean;
  /** Array of validation errors (empty if valid) */
  // readonly validationErrors: ValidationError[];
  /** Convert to string representation */
  toString(): string;
  /** Convert to JSON representation */
  toJSON(): string;
}

/**
 * County list mapping
 */
export type CountyList = Record<
  CountyCode,
  Omit<County, "code"> | { ISO: undefined; name: undefined }
>;

/**
 * Sex mapping from code to sex string
 */
export type SexMapping = Record<SexCode, Sex>;

/**
 * Century mapping from sex code to century prefix
 */
export type CenturyMap = Record<Exclude<SexCode, 7 | 8>, string>;

/**
 * Parser function type
 */
export type ParserFunction<T, R> = (input: T, ...args: any[]) => R;

/**
 * Validator function type
 */
export type ValidatorFunction<T> = (input: T, ...args: any[]) => boolean;
