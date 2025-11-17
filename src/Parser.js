import { checksumValidator } from "./checksumParser";
import countyParser, { countyValidator } from "./countyParser";
import dateParser, { dateValidator } from "./dateParser";
import { serialValidator } from "./serialParser";
import sexParser, { sexValidator } from "./sexParser";

export default class Parser {
  constructor(CNP) {
    const cnpString = String(CNP);

    if (!/^\d{13}$/.test(cnpString)) {
      throw new Error("Invalid CNP format: must be exactly 13 numeric digits");
    }

    this.raw = {
      cnp: cnpString,
      sex: cnpString[0],
      birthdate: cnpString.substring(1, 7),
      county: cnpString.substring(7, 9),
      serial: cnpString.substring(9, 12),
      checksum: cnpString[12],
    };
  }

  get sex() {
    return sexParser(this.raw.sex);
  }

  get birthdate() {
    return dateParser(this.raw.sex, this.raw.birthdate);
  }

  get day() {
    return this.birthdate.getDate();
  }

  get month() {
    return this.birthdate.getMonth() + 1; // month is zero indexed
  }

  get year() {
    return this.birthdate.getFullYear();
  }

  get county() {
    return countyParser(this.raw.county);
  }

  get serial() {
    return this.raw.serial;
  }

  get checksum() {
    return this.raw.checksum;
  }

  get isValid() {
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

  toString() {
    return this.raw.cnp.toString();
  }

  toJSON() {
    return JSON.stringify({
      birthdate: this.birthdate,
      checksum: this.checksum,
      county: this.county,
      serial: this.serial,
      sex: this.sex,
    });
  }
}
