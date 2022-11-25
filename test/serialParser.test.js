import { expect } from 'chai';

import { serialValidator } from '../src/serialParser';

describe(`county validator`, () => {
    it(`should return 'true' if serial is bigger than zero`, () => {
        expect(serialValidator(1)).to.be.true;
    });

    it(`should return 'false' if serial is small or equal to zero`, () => {
        expect(serialValidator(0)).to.be.false;
        expect(serialValidator(-1)).to.be.false;
    });
});
