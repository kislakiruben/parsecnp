import { describe, it, expect } from 'vitest';

import { checksumValidator } from '../src/checksumParser';

describe(`checksum validator`, () => {
    it(`should return 'true' for valid CNP`, () => {
        expect(checksumValidator('6130626527204', '4')).toBe(true);
        expect(checksumValidator('2941118271691', '1')).toBe(true);
        expect(checksumValidator('1900803342580', '0')).toBe(true);
    });

    it(`should return 'false' for invalid CNP`, () => {
        expect(checksumValidator('5160916081327', '7')).toBe(false);
        expect(checksumValidator('5031227201941', '1')).toBe(false);
    });
});
