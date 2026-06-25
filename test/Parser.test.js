import { describe, it, expect, vi } from "vitest";

import Parser from "../src/Parser";

describe(`main parser`, () => {
  it(`should have a proper constructor`, () => {
    expect(new Parser("1234567261011")).toMatchObject({
      raw: {
        birthdate: "234567",
        checksum: "1",
        cnp: "1234567261011",
        county: "26",
        serial: "101",
        sex: "1",
      },
    });
  });

  it(`should have getters`, () => {
    const instance = new Parser("6121212261011");

    expect(instance.sex).toBe("female");
    expect(instance.birthdate).toEqual(new Date(2012, 11, 12));
    expect(instance.day).toBe(12);
    expect(instance.month).toBe(12);
    expect(instance.year).toBe(2012);
    expect(instance.county).toMatchObject({
      code: "26",
      name: "Mureș",
      ISO: "MS",
    });
    expect(instance.serial).toBe("101");
    expect(instance.checksum).toBe("1");
    expect(instance.isValid).toBe(false);
  });

  it(`should validate CNPs generated with the unique county code`, () => {
    const instance = new Parser("1660302702618");

    expect(instance.county).toMatchObject({
      code: "70",
      name: "Cod unic",
      ISO: undefined,
    });
    expect(instance.isValid).toBe(true);
  });

  it(`should have methods`, () => {
    const instance = new Parser("6121212261011");
    vi.useFakeTimers({ now: new Date(2012, 11, 12).getTime() });

    expect(instance.toString()).toBe("6121212261011");
    expect(instance.toJSON()).toEqual(
      '{"birthdate":"2012-12-12T00:00:00.000Z","checksum":"1","county":{"code":"26","name":"Mureș","ISO":"MS"},"serial":"101","sex":"female"}',
    );
    vi.useRealTimers();
  });
});
