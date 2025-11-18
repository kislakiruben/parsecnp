import { expect, describe, it } from "vitest";

import ParseCnp from "../src/ParseCnp";
import CnpParser from "../src/CnpParser";

describe(`main module`, () => {
  it(`should create an instance when called with new`, () => {
    const instance = new ParseCnp("2121212261011");

    expect(instance).toBeInstanceOf(CnpParser);
  });

  it(`should create an instance when called with factory`, () => {
    const factory = ParseCnp("2121212261011");

    expect(factory).toBeInstanceOf(CnpParser);
  });
});
