import { describe, it, expect } from "vitest";
import { isDateValid, validateDate } from "./date";

describe("date validator", () => {
  it("should return true for valid date", () => {
    expect(isDateValid(new Date(1988, 0, 10))).toBe(true);
  });

  it("should return false for invalid date", () => {
    expect(isDateValid(new Date(""))).toBe(false);
    expect(isDateValid(new Date("foo-bar"))).toBe(false);
  });

  it("should return null for valid date", () => {
    expect(validateDate(new Date(1988, 0, 10))).toBeNull();
  });

  it("should return error for invalid date", () => {
    const result = validateDate(new Date(""));
    expect(result).not.toBeNull();
    expect(result!.field).toBe("birthdate");
  });
});
