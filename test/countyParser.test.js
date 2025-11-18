import { expect, describe, it } from "vitest";

import { parseCounty, isCountyValid } from "../src/countyParser";

describe(`county parser`, () => {
  it(`should return county code, name and ISO code if params is string`, () => {
    expect(parseCounty("9")).toMatchObject({
      code: "9",
      name: "Brăila",
      ISO: "BR",
    });
  });

  it(`should return county code, name and ISO code`, () => {
    expect(parseCounty("26")).toMatchObject({
      code: "26",
      name: "Mureș",
      ISO: "MS",
    });
  });

  it(`should return null if county is not in county list`, () => {
    expect(parseCounty("99")).toBe(null);
  });
});

describe(`county validator`, () => {
  it(`should return 'true' if county is in county list`, () => {
    expect(isCountyValid("26")).toBe(true);
  });

  it(`should return 'false' if county is not in county list`, () => {
    expect(isCountyValid("99")).toBe(false);
  });
});
