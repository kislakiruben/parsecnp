import type { RawCnp, Sex, County, ValidationError, ParsedCnp } from "./types";
import { isSexValid, validateSex } from "./validators/sex";
import { isDateValid, validateDate } from "./validators/date";
import { isCountyValid, validateCounty } from "./validators/county";
import { isSerialValid, validateSerial } from "./validators/serial";
import { isChecksumValid, validateChecksum } from "./validators/checksum";
import { parseSex } from "./parsers/sex";
import { parseDate } from "./parsers/date";
import { parseCounty } from "./parsers/county";

export default class CnpParser implements ParsedCnp {
  private _raw: RawCnp;

  constructor(cnp: string | number) {
    const cnpString = String(cnp);
    if (!/^\d{13}$/.test(cnpString)) {
      throw new Error(
        `Invalid CNP format: must be exactly 13 numeric digits`,
      );
    }
    this._raw = {
      cnp: cnpString,
      sex: cnpString[0] as RawCnp["sex"],
      birthdate: cnpString.substring(1, 7),
      county: cnpString.substring(7, 9),
      serial: cnpString.substring(9, 12),
      checksum: cnpString[12] as string,
    };
  }

  get raw(): RawCnp {
    return { ...this._raw };
  }

  get sex(): Sex {
    return parseSex(this._raw.sex);
  }

  get birthdate(): Date {
    return parseDate(this._raw.sex, this._raw.birthdate);
  }

  get day(): number {
    return this.birthdate.getDate();
  }

  get month(): number {
    return this.birthdate.getMonth() + 1;
  }

  get year(): number {
    return this.birthdate.getFullYear();
  }

  get county(): County {
    const parsed = parseCounty(this._raw.county);
    return parsed ?? {
      code: this._raw.county,
      name: "Unknown",
      ISO: "XX",
    };
  }

  get serial(): number {
    return parseInt(this._raw.serial, 10);
  }

  get checksum(): number {
    return parseInt(this._raw.checksum, 10);
  }

  get isValid(): boolean {
    return (
      isSexValid(this._raw.sex) &&
      isDateValid(this.birthdate) &&
      isCountyValid(this._raw.county, this.birthdate) &&
      isSerialValid(this._raw.serial) &&
      isChecksumValid(this._raw.cnp, this._raw.checksum)
    );
  }

  get validationErrors(): ValidationError[] {
    const errors: ValidationError[] = [];
    const sexError = validateSex(this._raw.sex);
    if (sexError) errors.push(sexError);
    const dateError = validateDate(this.birthdate);
    if (dateError) errors.push(dateError);
    const countyError = validateCounty(this._raw.county, this.birthdate);
    if (countyError) errors.push(countyError);
    const serialError = validateSerial(this._raw.serial);
    if (serialError) errors.push(serialError);
    const checksumError = validateChecksum(this._raw.cnp, this._raw.checksum);
    if (checksumError) errors.push(checksumError);
    return errors;
  }

  toString(): string {
    return this._raw.cnp;
  }

  toJSON(): object {
    return {
      cnp: this._raw.cnp,
      sex: this.sex,
      birthdate: this.birthdate.toISOString(),
      year: this.year,
      month: this.month,
      day: this.day,
      county: this.county,
      serial: this.serial,
      checksum: this.checksum,
      isValid: this.isValid,
    };
  }
}
