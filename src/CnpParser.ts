import {
  isChecksumValid,
  isCountyValid,
  isDateValid,
  isSerialValid,
  isSexValid,
} from "./validators";
import { parseCounty, parseDate, parseSex } from "./parsers";
import type { County, ParsedCnp, RawCnp, Sex } from "./types";

/**
 * Main parser class for CNP (Cod Numeric Personal)
 * Validates and parses all components of a Romanian personal identification number
 */
export default class CnpParser implements ParsedCnp {
  private raw: RawCnp;
  /**
   * Creates a new Parser instance
   * @param CNP - 13-digit CNP string or number
   * @throws Error if CNP is not 13 digits or contains non-numeric characters
   */
  constructor(cnp: string | number) {
    const cnpString = String(cnp);

    if (!/^\d{13}$/.test(cnpString)) {
      throw new Error("Invalid CNP format: must be exactly 13 numeric digits");
    }

    this.raw = {
      cnp: cnpString,
      sex: cnpString[0] as RawCnp["sex"],
      birthdate: cnpString.substring(1, 7),
      county: cnpString.substring(7, 9),
      serial: cnpString.substring(9, 12),
      checksum: cnpString[12],
    };
  }

  get sex(): Sex {
    return parseSex(this.raw.sex);
  }

  get birthdate(): Date {
    return parseDate(this.raw.sex, this.raw.birthdate);
  }

  get day(): number {
    return this.birthdate.getDate();
  }

  get month(): number {
    return this.birthdate.getMonth() + 1; // month is zero indexed
  }

  get year(): number {
    return this.birthdate.getFullYear();
  }

  get county(): County {
    return parseCounty(this.raw.county);
  }

  get serial(): string {
    return this.raw.serial;
  }

  get checksum(): string {
    return this.raw.checksum;
  }

  get isValid(): boolean {
    return (
      isSexValid(this.raw.sex) &&
      isDateValid(this.birthdate) &&
      isCountyValid(this.raw.county, this.birthdate) &&
      isSerialValid(this.raw.serial) &&
      isChecksumValid(this.raw.cnp, this.raw.checksum)
    );
  }

  toString(): string {
    return this.raw.cnp.toString();
  }

  toJSON(): string {
    return JSON.stringify({
      birthdate: this.birthdate,
      checksum: this.checksum,
      county: this.county,
      serial: this.serial,
      sex: this.sex,
    });
  }
}
