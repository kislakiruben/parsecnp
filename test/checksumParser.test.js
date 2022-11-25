import { expect } from 'chai';

import { checksumValidator } from '../src/checksumParser';

describe(`checksum validator`, () => {
    it(`should return 'true' for valid CNP`, () => {
        expect(checksumValidator('6130626527204', '4')).to.be.true;
        expect(checksumValidator('2941118271691', '1')).to.be.true;
        expect(checksumValidator('1900803342580', '0')).to.be.true;
    });

    it(`should return 'false' for invalid CNP`, () => {
        expect(checksumValidator('5160916081327', '7')).to.be.false;
        expect(checksumValidator('5031227201941', '1')).to.be.false;
    });
});
