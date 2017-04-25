import countyParser from './countyParser';
import dateParser from './dateParser';
import sexParser from './sexParser';

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

    regex() {
        return /(^[1-8])(\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])(\d{2})(\d{3})(\d)/.exec(this.raw);
    }
}
