import { expect, describe, it } from "vitest";

import { isSerialValid } from "../src/serialParser";

describe(`serial validator`, () => {
  it(`should return 'false' if serial is small or equal to zero`, () => {
    expect(isSerialValid("000")).toBe(false);
    expect(isSerialValid("001")).toBe(true);
  });

  it(`should correctly parse if param is a string`, () => {
    expect(isSerialValid("000")).toBe(false);
    expect(isSerialValid("001")).toBe(true);
  });

  it(`should return 'false' if serial is bigger than 999`, () => {
    expect(isSerialValid("1000")).toBe(false);
  });
});
