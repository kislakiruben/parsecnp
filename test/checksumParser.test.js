import { expect, describe, it } from "vitest";

import { isChecksumValid } from "../src/checksumParser";

describe(`checksum validator`, () => {
  it(`should return 'true' for valid CNP`, () => {
    expect(isChecksumValid("6130626527204", "4")).toBe(true);
    expect(isChecksumValid("2941118271691", "1")).toBe(true);
    expect(isChecksumValid("1900803342580", "0")).toBe(true);
  });

  it(`should return 'false' for invalid CNP`, () => {
    expect(isChecksumValid("5160916081327", "7")).toBe(false);
    expect(isChecksumValid("5031227201941", "1")).toBe(false);
  });
});
