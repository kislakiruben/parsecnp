import { expect, describe, it } from "vitest";
import { isCountyValid } from "./county";

describe("isCountyValid", () => {
  it("should return true if county is in county list", () => {
    expect(isCountyValid("26")).toBe(true);
  });

  it("should return false if county is not in county list", () => {
    expect(isCountyValid("99")).toBe(false);
  });

  it("should return false for county code 47 and 48 and no birthdate", () => {
    expect(isCountyValid("47")).toBe(false);
    expect(isCountyValid("48")).toBe(false);
  });

  it("should correctly return for county code 47 and 48 with birthdate after December 12, 1979", () => {
    expect(isCountyValid("47", new Date(1980, 10, 12))).toBe(false);
    expect(isCountyValid("48", new Date(1980, 10, 12))).toBe(false);
  });

  it("should correctly return for county code 47 and 48 with birthdate before December 12, 1979", () => {
    expect(isCountyValid("47", new Date(1978, 10, 12))).toBe(true);
    expect(isCountyValid("48", new Date(1978, 10, 12))).toBe(true);
  });

  it("should return false for county code 51 and 52 and no birthdate", () => {
    expect(isCountyValid("51")).toBe(false);
    expect(isCountyValid("52")).toBe(false);
  });

  it("should reject code 51 and 52 for birthdate before Feb 17, 1981", () => {
    expect(isCountyValid("51", new Date(1981, 1, 16))).toBe(false);
    expect(isCountyValid("52", new Date(1981, 1, 16))).toBe(false);
  });

  it("should accept code 51 and 52 for birthdate on/after Feb 17, 1981", () => {
    expect(isCountyValid("51", new Date(1981, 1, 17))).toBe(true);
    expect(isCountyValid("52", new Date(1981, 1, 17))).toBe(true);
  });

  it("should return false for county code 23 and no birthdate", () => {
    expect(isCountyValid("23")).toBe(false);
  });

  it("should reject code 23 (Ilfov) for birthdate before Feb 14, 1968", () => {
    expect(isCountyValid("23", new Date(1968, 1, 13))).toBe(false);
  });

  it("should accept code 23 (Ilfov) for birthdate on/after Feb 14, 1968", () => {
    expect(isCountyValid("23", new Date(1968, 1, 14))).toBe(true);
  });
});
