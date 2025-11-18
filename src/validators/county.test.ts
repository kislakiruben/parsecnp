import { expect, describe, it } from "vitest";
import { isCountyValid } from "./county";

describe("isCountyValid", () => {
  it("should return true if county is in county list", () => {
    expect(isCountyValid("26")).toBe(true);
  });

  it("should return false if county is not in county list", () => {
    expect(isCountyValid("99")).toBe(false);
  });
});
