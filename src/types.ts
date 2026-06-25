export type SexCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SexCodeString = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Sex = "male" | "female" | "not known" | "not applicable";

export type CountyCode = string;

export type CountyISO = string;

export interface County {
  code: CountyCode;
  name: string;
  ISO: CountyISO;
}

export interface RawCnp {
  cnp: string;
  sex: SexCodeString;
  birthdate: string;
  county: CountyCode;
  serial: string;
  checksum: string;
}

export interface ParsedCnp {
  readonly sex: Sex;
  readonly birthdate: Date;
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly county: County;
  readonly serial: number;
  readonly checksum: number;
  readonly isValid: boolean;
  readonly validationErrors: ValidationError[];
  readonly raw: RawCnp;
  toString(): string;
  toJSON(): object;
}

export interface ValidationError {
  field: "sex" | "birthdate" | "county" | "serial" | "checksum" | "format";
  message: string;
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
