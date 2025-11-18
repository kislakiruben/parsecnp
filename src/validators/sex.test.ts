import { expect, describe, it } from "vitest";
import { isSexValid } from "./sex";

describe("isSexValid", () => {
  it("should return true if sex code is in map", () => {
    const valid = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    valid.forEach((code) => {
      expect(isSexValid(code)).toBe(true);
    });
  });

  it("should return false if sex code is not mapped", () => {
    const invalid = ["11", "99", "100"];

    invalid.forEach((code) => {
      expect(isSexValid(code)).toBe(false);
    });
  });

  it("should return false if input is invalid", () => {
    expect(isSexValid("foo")).toBe(false);
  });
});
