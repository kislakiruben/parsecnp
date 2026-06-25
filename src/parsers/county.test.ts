import { describe, it, expect } from "vitest";
import { parseCounty } from "./county";

describe("county parser", () => {
  it("should return county info for valid code", () => {
    expect(parseCounty("26")).toEqual({
      code: "26",
      name: "Mureș",
      ISO: "MS",
    });
  });

  it("should return county for two-digit string", () => {
    expect(parseCounty("09")).toEqual({
      code: "09",
      name: "Brăila",
      ISO: "BR",
    });
  });

  it("should return county info for historical codes 47-48", () => {
    expect(parseCounty("47")).toEqual({
      code: "47",
      name: "București Sector 7",
      ISO: "B",
    });
    expect(parseCounty("48")).toEqual({
      code: "48",
      name: "București Sector 8",
      ISO: "B",
    });
  });

  it("should return null for unknown county code", () => {
    expect(parseCounty("99")).toBeNull();
  });

  it("should return county info for unique registration code", () => {
    expect(parseCounty("70")).toEqual({
      code: "70",
      name: "Cod unic",
      ISO: "XX",
    });
  });
});
