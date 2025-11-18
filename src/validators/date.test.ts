import { expect, describe, it } from "vitest";
import { isDateValid } from "./date";

describe("isDateValid", () => {
  it("should return true if date is valid", () => {
    expect(isDateValid(new Date(1988, 0, 10))).toBe(true);
  });

  it("should return false if is not valid", () => {
    expect(isDateValid(new Date("foo-bar"))).toBe(false);
  });
});
