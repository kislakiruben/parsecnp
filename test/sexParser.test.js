import { expect, describe, it } from "vitest";

import { parseSex, isSexValid } from "../src/sexParser";

describe(`sex parser`, () => {
  it(`should return 'not known' for sex code 0`, () => {
    expect(parseSex("0")).toBe("not known");
  });

  it(`should return 'male' for sex code 1`, () => {
    expect(parseSex("1")).toBe("male");
  });

  it(`should return 'female' for sex code 2`, () => {
    expect(parseSex("2")).toBe("female");
  });

  it(`should return 'male' for sex code 3`, () => {
    expect(parseSex("3")).toBe("male");
  });

  it(`should return 'female' for sex code 4`, () => {
    expect(parseSex("4")).toBe("female");
  });

  it(`should return 'male' for sex code 5`, () => {
    expect(parseSex("5")).toBe("male");
  });

  it(`should return 'female' for sex code 6`, () => {
    expect(parseSex("6")).toBe("female");
  });

  it(`should return 'male' for sex code 7`, () => {
    expect(parseSex("7")).toBe("male");
  });

  it(`should return 'female' for sex code 8`, () => {
    expect(parseSex("8")).toBe("female");
  });

  it(`should return 'not applicable' for sex code 9`, () => {
    expect(parseSex("9")).toBe("not applicable");
  });
});

describe(`sex validator`, () => {
  it(`should return 'true' if sex code is in map`, () => {
    const valid = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    valid.forEach((code) => {
      expect(isSexValid(code)).toBe(true);
    });
  });

  it(`should return 'false' if sex code is not mapped`, () => {
    const invalid = ["11", "99", "100"];

    invalid.forEach((code) => {
      expect(isSexValid(code)).toBe(false);
    });
  });
});
