import { describe, it, expect } from "vitest";
import { parseSex } from "./sex";

describe("sex parser", () => {
  it("should return 'not known' for sex code 0", () => {
    expect(parseSex(0)).toBe("not known");
  });

  it("should return 'male' for sex codes 1, 3, 5, 7", () => {
    expect(parseSex(1)).toBe("male");
    expect(parseSex(3)).toBe("male");
    expect(parseSex(5)).toBe("male");
    expect(parseSex(7)).toBe("male");
  });

  it("should return 'female' for sex codes 2, 4, 6, 8", () => {
    expect(parseSex(2)).toBe("female");
    expect(parseSex(4)).toBe("female");
    expect(parseSex(6)).toBe("female");
    expect(parseSex(8)).toBe("female");
  });

  it("should return 'not applicable' for sex code 9", () => {
    expect(parseSex(9)).toBe("not applicable");
  });

  it("should handle string sex codes", () => {
    expect(parseSex("1")).toBe("male");
    expect(parseSex("2")).toBe("female");
  });
});
