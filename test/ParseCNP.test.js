import { expect } from 'chai';

import ParseCNP from '../src/ParseCNP';
import Parser from '../src/Parser';

describe(`main module`, () => {
    it(`should create an instance when called with new`, () => {
        const instance = new ParseCNP('2121212261011');

        expect(instance).to.be.an.instanceof(Parser);
    })

    it(`should create an instance when called with factory`, () => {
        const factory = ParseCNP('2121212261011');

        expect(factory).to.be.an.instanceof(Parser);
    })
});
