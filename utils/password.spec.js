/* eslint-env mocha */
import { expect } from "chai"
import {
  tooLong,
  tooShort,
  isLowerCaseAlphabetic,
  hasIllegalCharacters,
  hasIncreasingStraight
} from "./password"

describe("tooLong?", function() {
  it("returns true because longer than 32", function() {
    expect(tooLong("abcdefghijklmodnsfodsidsfjdsofjde")).to.be.true
  })
  it("returns false because shorter than 32", function() {
    expect(tooLong("abcdefghijklmodnsf")).to.be.false
  })
  it("returns false because exactly 32", function() {
    expect(tooLong("abcdefghijklmodnsf18273645163847")).to.be.false
  })
})

describe("tooShort?", function() {
  it("returns true because shorter than 3", function() {
    expect(tooShort("ab")).to.be.true
  })
  it("returns false because longer than 3", function() {
    expect(tooShort("abdsfdsfdsf")).to.be.false
  })
  it("returns false because exactly 3", function() {
    expect(tooShort("abd")).to.be.false
  })
})

describe("isLowerCaseAlphabetic?", function() {
  it("returns true because password only contains lower case alphabetic characters", function() {
    expect(isLowerCaseAlphabetic("absdfdsf")).to.be.true
  })
  it("returns false because password contains capital alphabetic characters", function() {
    expect(isLowerCaseAlphabetic("absdfdASDASDASDDADASDASsf")).to.be.false
  })
  it("returns false because password contains numbers", function() {
    expect(isLowerCaseAlphabetic("absdfd123489230")).to.be.false
  })
  it("returns false because password contains numbers and capital alphabetic characters", function() {
    expect(isLowerCaseAlphabetic("absdfdA12348923BCCA")).to.be.false
  })
})
describe("hasIllegalCharacters?", function() {
  it('returns true because password contains "i"', function() {
    expect(hasIllegalCharacters("absdfdisf")).to.be.true
  })
  it('returns false because password does not contains "i"', function() {
    expect(hasIllegalCharacters("absdfdASDASDASDDADASDASsf")).to.be.false
  })
})

describe("hasIncreasingStraight?", function() {
  it("returns true because password contains increasing straight", function() {
    expect(hasIncreasingStraight("abcabcdkfdjlsdef")).to.be.true
  })
  it("returns false because password does not contain increasing straight", function() {
    expect(hasIncreasingStraight("acdsdfkjsljdfxyn")).to.be.false
  })
})
