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

  it("should return null for defunct county codes 47 and 48", () => {
    expect(parseCounty("47")).toBe(null);
    expect(parseCounty("48")).toBe(null);
  });

  it("should return null if county is not in county list", () => {
    expect(parseCounty("99")).toBe(null);
  });
});
