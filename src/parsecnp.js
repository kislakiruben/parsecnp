class parser {
    constructor(CNP) {
        this.raw = CNP;

        this.sex = this.getSex();
        this.year = this.getYear();
        this.month = this.getMonth();
        this.day = this.getDay();
        this.county = this.getCounty();
        this.serial = this.getSerial();
        this.checksum = this.getChecksum();

        return this;
    }

    getSex() {
        const sex = this.regex()[1];

        return sex;
    }

    getBirthdate() {
        return new Date(this.getYear(), this.getMonth() - 1, this.getDay());
    }

    getDay() {
        const day = this.regex()[4];
        const date = new Date(0, 0, day);

        return date.getDate();
    }

    getMonth() {
        const month = this.regex()[3];
        const date = new Date(0, month);

        return date.getMonth();
    }

    getYear() {
        const year = this.regex()[2];
        const date = new Date(year);

        return date.getFullYear();
    }

    getCounty() {
        return this.regex()[5];
    }

    getSerial() {
        return this.regex()[6];
    }

    getChecksum() {
        return this.regex()[7];
    }

    regex() {
        return /(^[1-8])(\d{2})(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])(\d{2})(\d{3})(\d)/.exec(this.raw);
    }
}

function ParseCNP(CNP) {
    if (!(this instanceof parser)) {
        return new parser(CNP);
    }

    return this;
}

export default ParseCNP;
