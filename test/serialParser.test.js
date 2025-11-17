import { expect } from "chai";

import { serialValidator } from "../src/serialParser";

describe(`serial validator`, () => {
  it(`should return 'false' if serial is small or equal to zero`, () => {
    expect(serialValidator(0)).to.be.false;
    expect(serialValidator(-1)).to.be.false;
  });

  it(`should correctly parse if param is a string`, () => {
    expect(serialValidator("000")).to.be.false;
    expect(serialValidator("001")).to.be.true;
  });

  it(`should return 'false' if serial is bigger than 999`, () => {
    expect(serialValidator("1000")).to.be.false;
  });
});
