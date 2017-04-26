import { checksumValidator } from "./checksumParser";
import countyParser, { countyValidator } from './countyParser';
import dateParser from './dateParser';
import { serialValidator } from "./serialParser";
import sexParser, { sexValidator } from './sexParser';

export default class Parser {
    constructor(CNP) {
        this.raw = CNP;
    }

    get sex() {
        const sexCode = this.regex(1);

        return sexParser(sexCode);
    }

    get birthdate() {
        const day = this.regex(4);
        const month = this.regex(3) - 1; // month is zero indexed
        const year = this.regex(2);

        return dateParser(year, month, day);
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
        const countyCode = this.regex(5);

        return countyParser(countyCode);
    }

    get serial() {
        return this.regex(6);
    }

    get checksum() {
        return this.regex(7);
    }

    get isValid() {
        const sexIsValid = sexValidator(this.regex(1))
        const countyIsValid = countyValidator(this.regex(5));
        const serialIsValid = serialValidator(this.regex(6));
        const checksumIsValid = checksumValidator(this.raw, this.regex(7));
        const dateIsValid = true;

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
            sex: this.sex,
            county: this.county,
            birthdate: this.birthdate,
            serial: this.serial,
            checksum: this.checksum,
        });
    }

    regex(captureGroup) {
        const match = /(^\d)(\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])(\d{2})(\d{3})(\d)/.exec(this.raw);

        return match[captureGroup];
    }
}
