import { expect } from 'chai';

import { default as countyParser, countyValidator } from '../src/countyParser';

describe(`county parser`, () => {
    it(`should return county code, name and ISO code`, () => {
        expect(countyParser(26)).to.include({ code: 26, name: 'Mureș', ISO: 'MS' });
    });

    it(`should return 'false' if county is not in county list`, () => {
        expect(countyValidator('99')).to.be.false;
    });
});

describe(`county validator`, () => {
    it(`should return 'true' if county is in county list`, () => {
        expect(countyValidator('26')).to.be.true;
    });

    it(`should return 'false' if county is not in county list`, () => {
        expect(countyValidator('99')).to.be.false;
    });
});
