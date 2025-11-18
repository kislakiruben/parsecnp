import { expect, describe, it } from "vitest";
import ParseCnp from "./ParseCnp";
import CnpParser from "./CnpParser";

describe("ParseCnp", () => {
  it("should create an instance when called with new", () => {
    const instance = new ParseCnp("2121212261011");

    expect(instance).toBeInstanceOf(CnpParser);
  });

  it("should create an instance when called with factory", () => {
    const factory = ParseCnp("2121212261011");

    expect(factory).toBeInstanceOf(CnpParser);
  });

  it("should return this when this is already a CnpParser instance", () => {
    const instance = new CnpParser("2121212261011");
    const result = ParseCnp.call(instance, "2121212261011");

    expect(result).toBe(instance);
    expect(result).toBeInstanceOf(CnpParser);
  });
});
