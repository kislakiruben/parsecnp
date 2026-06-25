import { describe, it, expect } from "vitest";

import { serialValidator } from "../src/serialParser";

describe(`serial validator`, () => {
  it(`should return 'false' if serial is small or equal to zero`, () => {
    expect(serialValidator(0)).toBe(false);
    expect(serialValidator(-1)).toBe(false);
  });

  it(`should correctly parse if param is a string`, () => {
    expect(serialValidator("000")).toBe(false);
    expect(serialValidator("001")).toBe(true);
  });

  it(`should return 'false' if serial is bigger than 999`, () => {
    expect(serialValidator("1000")).toBe(false);
  });
});
