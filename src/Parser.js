import { checksumValidator } from "./checksumParser";
import countyParser, { countyValidator } from './countyParser';
import dateParser, { dateValidator } from './dateParser';
import { serialValidator } from "./serialParser";
import sexParser, { sexValidator } from './sexParser';

export default class Parser {
    constructor(CNP) {
        this.raw = {
            cnp: CNP,
            sex: CNP.charAt(0),
            birthdate: CNP.substr(1,6),
            county: CNP.substr(7,2),
            serial: CNP.substr(9,3),
            checksum: CNP.charAt(12),
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
        const sexIsValid = sexValidator(this.raw.sex)
        const countyIsValid = countyValidator(this.raw.county);
        const serialIsValid = serialValidator(this.raw.serial);
        const checksumIsValid = checksumValidator(this.raw.cnp, this.raw.checksum);
        const dateIsValid = dateValidator(this.birthdate);

        return sexIsValid
            && dateIsValid
            && countyIsValid
            && serialIsValid
            && checksumIsValid;
    }

    toString() {
        return this.raw.toString();
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
