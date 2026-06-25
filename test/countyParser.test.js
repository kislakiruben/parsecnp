import { describe, it, expect } from "vitest";

import { default as countyParser, countyValidator } from "../src/countyParser";

describe(`county parser`, () => {
  it(`should return county code, name and ISO code`, () => {
    expect(countyParser(26)).toMatchObject({
      code: 26,
      name: "Mureș",
      ISO: "MS",
    });
  });

  it(`should return county code, name and ISO code if params is string`, () => {
    expect(countyParser("9")).toMatchObject({
      code: "9",
      name: "Brăila",
      ISO: "BR",
    });
  });

  it(`should return county code, name and ISO code if params is number`, () => {
    expect(countyParser(9)).toMatchObject({
      code: 9,
      name: "Brăila",
      ISO: "BR",
    });
  });

  it(`should return county code, name and ISO code if params is a two-digit string`, () => {
    expect(countyParser("09")).toMatchObject({
      code: "09",
      name: "Brăila",
      ISO: "BR",
    });
  });

  it(`should return county code for the unique registration code`, () => {
    expect(countyParser("70")).toMatchObject({
      code: "70",
      name: "Cod unic",
      ISO: undefined,
    });
  });

  it(`should return object if county is not in county list`, () => {
    expect(countyParser("99")).toMatchObject({
      code: "99",
      name: undefined,
      ISO: undefined,
    });
  });
});

describe(`county validator`, () => {
  it(`should return 'true' if county is in county list`, () => {
    expect(countyValidator("26")).toBe(true);
  });

  it(`should return 'true' if county is a two-digit county code`, () => {
    expect(countyValidator("09")).toBe(true);
  });

  it(`should return 'true' if county is the unique registration code`, () => {
    expect(countyValidator("70")).toBe(true);
  });

  it(`should return 'false' if county is not in county list`, () => {
    expect(countyValidator("99")).toBe(false);
  });
});
