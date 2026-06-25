import { describe, it, expect } from "vitest";
import { isSexValid, validateSex } from "./sex";

describe("sex validator", () => {
  it("should return true for valid sex codes", () => {
    const valid = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    valid.forEach((code) => {
      expect(isSexValid(code)).toBe(true);
    });
  });

  it("should return false for invalid sex codes", () => {
    expect(isSexValid("11")).toBe(false);
    expect(isSexValid("99")).toBe(false);
    expect(isSexValid("100")).toBe(false);
    expect(isSexValid("0")).toBe(false);
  });

  it("should return null for valid sex code", () => {
    expect(validateSex("1")).toBeNull();
  });

  it("should return error for invalid sex code", () => {
    const result = validateSex("0");
    expect(result).not.toBeNull();
    expect(result!.field).toBe("sex");
    expect(result!.code).toBe("invalid_sex_code");
  });
});
