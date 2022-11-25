import { expect } from 'chai';

import { default as dateParser, dateValidator } from '../src/dateParser';

describe(`date parser`, () => {
    it(`should return county code, name and ISO code`, () => {
        expect(dateParser(1, '880110')).to.equalDate(new Date(1988, 0, 10));
        expect(dateParser(5, '020202')).to.equalDate(new Date(2002, 1, 2));
    });
});

describe(`date validator`, () => {
    it(`should return 'true' if date is valid`, () => {
        expect(dateValidator(new Date(1988, 0, 10))).to.be.true;
    });

    it(`should return 'false' if is not valid`, () => {
        expect(dateValidator('foo-bar')).to.be.false;
    });
});
