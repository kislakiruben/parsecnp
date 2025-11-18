import { expect, describe, it } from "vitest";
import { isCountyValid } from "./county";

describe("isCountyValid", () => {
  it("should return true if county is in county list", () => {
    expect(isCountyValid("26")).toBe(true);
  });

  it("should return false if county is not in county list", () => {
    expect(isCountyValid("99")).toBe(false);
  });

  it("should correctly return for county code 47 and 48 and no birthdate", () => {
    expect(isCountyValid("47")).toBe(false);
    expect(isCountyValid("48")).toBe(false);
  });

  it("should correctly return for county code 47 and 48 with birthdate after December 19, 1979", () => {
    expect(isCountyValid("47", new Date(1980, 10, 12))).toBe(false);
    expect(isCountyValid("48", new Date(1980, 10, 12))).toBe(false);
  });

  it("should correctly return for county code 47 and 48 with birthdate before December 19, 1979", () => {
    expect(isCountyValid("47", new Date(1978, 10, 12))).toBe(true);
    expect(isCountyValid("48", new Date(1978, 10, 12))).toBe(true);
  });
});
