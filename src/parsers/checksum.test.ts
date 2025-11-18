import { expect, describe, it } from "vitest";
import { parseChecksum } from "./checksum";

describe("parseChecksum", () => {
  it("should return the 13th character from the CNP", () => {
    expect(parseChecksum("6121212261011")).toBe("1");
  });
});
