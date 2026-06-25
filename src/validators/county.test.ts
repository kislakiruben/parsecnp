import { describe, it, expect } from "vitest";
import { isCountyValid, validateCounty } from "./county";

describe("county validator", () => {
  it("should return true for valid county code", () => {
    expect(isCountyValid("26")).toBe(true);
    expect(isCountyValid("12")).toBe(true);
  });

  it("should return true for two-digit string county code", () => {
    expect(isCountyValid("09")).toBe(true);
  });

  it("should return true for unique registration code", () => {
    expect(isCountyValid("70")).toBe(true);
  });

  it("should return false for unknown county code", () => {
    expect(isCountyValid("99")).toBe(false);
  });

  it("should validate historical districts 47-48 only before 1979", () => {
    const beforeAbolish = new Date(1979, 11, 18);
    const afterAbolish = new Date(1979, 11, 19);
    expect(isCountyValid("47", beforeAbolish)).toBe(true);
    expect(isCountyValid("47", afterAbolish)).toBe(false);
    expect(isCountyValid("48", beforeAbolish)).toBe(true);
    expect(isCountyValid("48", afterAbolish)).toBe(false);
  });

  it("should return false for codes 47-48 without birthdate", () => {
    expect(isCountyValid("47")).toBe(false);
    expect(isCountyValid("48")).toBe(false);
  });

  it("should return error for temporal validation failure", () => {
    const result = validateCounty("47", new Date(2000, 0, 1));
    expect(result).not.toBeNull();
    expect(result!.code).toBe("invalid_county_temporal");
  });

  it("should return null for valid temporal county", () => {
    expect(validateCounty("47", new Date(1979, 11, 18))).toBeNull();
  });
});
