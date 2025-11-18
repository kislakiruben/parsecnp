import { checksumValidator } from "./checksumParser";
import countyParser, { countyValidator } from "./countyParser";
import dateParser, { dateValidator } from "./dateParser";
import { serialValidator } from "./serialParser";
import sexParser, { sexValidator } from "./sexParser";
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
    return sexParser(this.raw.sex);
  }

  get birthdate(): Date {
    return dateParser(this.raw.sex, this.raw.birthdate);
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
    return countyParser(this.raw.county);
  }

  get serial(): string {
    return this.raw.serial;
  }

  get checksum(): string {
    return this.raw.checksum;
  }

  get isValid(): boolean {
    const sexIsValid = sexValidator(this.raw.sex);
    const countyIsValid = countyValidator(this.raw.county);
    const serialIsValid = serialValidator(this.raw.serial);
    const checksumIsValid = checksumValidator(this.raw.cnp, this.raw.checksum);
    const dateIsValid = dateValidator(this.birthdate);

    return (
      sexIsValid &&
      dateIsValid &&
      countyIsValid &&
      serialIsValid &&
      checksumIsValid
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
