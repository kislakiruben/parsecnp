import { describe, it, expect } from 'vitest';

import { default as dateParser, dateValidator } from '../src/dateParser';

describe(`date parser`, () => {
    it(`should create a correct date object`, () => {
        expect(dateParser(1, '880110')).toEqual(new Date(1988, 0, 10));
        expect(dateParser(5, '020202')).toEqual(new Date(2002, 1, 2));
        expect(dateParser(6, '120401')).toEqual(new Date(2012, 3, 1));
    });

    it(`should correctly parse resident birthdate`, () => {
        expect(dateParser(7, '120401')).toEqual(new Date(2012, 3, 1));
        expect(dateParser(7, '880401')).toEqual(new Date(1988, 3, 1));
    })

    it(`should correctly parse resident birthdate for sex code 8`, () => {
        expect(dateParser(8, '150601')).toEqual(new Date(2015, 5, 1));
        expect(dateParser(8, '900301')).toEqual(new Date(1990, 2, 1));
    });

    it(`should correctly parse foreign nationals (sex code 9)`, () => {
        expect(dateParser(9, '850505')).toEqual(new Date(1985, 4, 5));
        expect(dateParser(9, '120401')).toEqual(new Date(2012, 3, 1));
    });

    it(`should handle string sex codes correctly`, () => {
        // Ensure type safety - sex codes are strings from CNP parsing
        expect(dateParser('7', '120401')).toEqual(new Date(2012, 3, 1));
        expect(dateParser('8', '150601')).toEqual(new Date(2015, 5, 1));
        expect(dateParser('9', '850505')).toEqual(new Date(1985, 4, 5));
    })
});

describe(`date validator`, () => {
    it(`should return 'true' if date is valid`, () => {
        expect(dateValidator(new Date(1988, 0, 10))).toBe(true);
    });

    it(`should return 'false' if is not valid`, () => {
        expect(dateValidator('foo-bar')).toBe(false);
    });
});
