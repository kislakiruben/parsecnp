import { expect, describe, it } from "vitest";
import { parseCounty } from "./county";

describe("parseCounty", () => {
  it("should return county code, name and ISO", () => {
    expect(parseCounty("9")).toMatchObject({
      code: "9",
      name: "Brăila",
      ISO: "BR",
    });
  });

  it("should return county code, name and ISO code", () => {
    expect(parseCounty("26")).toMatchObject({
      code: "26",
      name: "Mureș",
      ISO: "MS",
    });
  });

  it("should correctly return for county code 47 and 48", () => {
    ["47", "48"].forEach((countyCode) => {
      expect(parseCounty(countyCode)).toMatchObject({
        ISO: undefined,
        code: countyCode,
        name: undefined,
      });
    });
  });

  it("should return null if county is not in county list", () => {
    expect(parseCounty("99")).toBe(null);
  });
});
