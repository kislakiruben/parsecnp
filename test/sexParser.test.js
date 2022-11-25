import { expect } from 'chai';

import { default as sexParser, sexValidator } from '../src/sexParser';

describe(`sex parser`, () => {
    it(`should return 'not kwown' for sex code 0`, () => {
        expect(sexParser(0)).to.be.string('not kwown');
    });

    it(`should return 'male' for sex code 1`, () => {
        expect(sexParser(1)).to.be.string('male');
    });

    it(`should return 'female' for sex code 2`, () => {
        expect(sexParser(2)).to.be.string('female');
    });

    it(`should return 'male' for sex code 3`, () => {
        expect(sexParser(3)).to.be.string('male');
    });

    it(`should return 'female' for sex code 4`, () => {
        expect(sexParser(4)).to.be.string('female');
    });

    it(`should return 'male' for sex code 5`, () => {
        expect(sexParser(5)).to.be.string('male');
    });

    it(`should return 'female' for sex code 6`, () => {
        expect(sexParser(6)).to.be.string('female');
    });

    it(`should return 'male' for sex code 7`, () => {
        expect(sexParser(7)).to.be.string('male');
    });

    it(`should return 'female' for sex code 8`, () => {
        expect(sexParser(8)).to.be.string('female');
    });

    it(`should return 'not applicable' for sex code 9`, () => {
        expect(sexParser(9)).to.be.string('not applicable');
    });
});

describe(`sex validator`, () => {
    it(`should return 'true' if sex code is in map`, () => {
        const valid = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

        valid.forEach(code => {
            expect(sexValidator(code)).to.be.true;
        })
    });

    it(`should return 'false' if sex code is not mapped`, () => {
        const invalid = ['11', '99', '100'];

        invalid.forEach(code => {
            expect(sexValidator(code)).to.be.false;
        })
    });
});
