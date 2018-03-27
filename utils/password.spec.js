/* eslint-env mocha */
import { expect } from "chai"
import validate, {
  trimPassword,
  tooLong,
  tooShort,
  isNotLowerCaseAlphabetic,
  hasIllegalCharacters,
  hasIncreasingStraight,
  hasTwoOverlappingPairs
} from "./password"

describe("tooLong?", function() {
  it("returns trimmed password", function() {
    expect(trimPassword("abcdefghijklmodnsfodsidsfjdsofjde    ")).to.equal("abcdefghijklmodnsfodsidsfjdsofjde")
  })
})

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

describe("isNotLowerCaseAlphabetic?", function() {
  it("returns true because password only contains lower case alphabetic characters", function() {
    expect(isNotLowerCaseAlphabetic("absdfdsf")).to.be.false
  })
  it("returns false because password contains capital alphabetic characters", function() {
    expect(isNotLowerCaseAlphabetic("absdfdASDASDASDDADASDASsf")).to.be.true
  })
  it("returns false because password contains numbers", function() {
    expect(isNotLowerCaseAlphabetic("absdfd123489230")).to.be.true
  })
  it("returns false because password contains numbers and capital alphabetic characters", function() {
    expect(isNotLowerCaseAlphabetic("absdfdA12348923BCCA")).to.be.true
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
    expect(hasIncreasingStraight("abcdkfdjlsdef")).to.be.true
  })
  it("returns false because password does not contain increasing straight", function() {
    expect(hasIncreasingStraight("acdsdfkjsljdfxyn")).to.be.false
  })
})

describe("hasTwoOverlappingPairs?", function() {
  it("returns true because password contains two overlapping pairs", function() {
    expect(hasTwoOverlappingPairs("aabcdkfdjlsdeef")).to.be.true
  })
  it("returns false because password only contains one overlapping pair", function() {
    expect(hasTwoOverlappingPairs("aacdsdfkjsljdfxyn")).to.be.false
  })
  it("returns false because password does not contain two overlapping pairs", function() {
    expect(hasTwoOverlappingPairs("acdsdfkjsljdfxyn")).to.be.false
  })
})

describe("validates?", function() {
  it("returns true if valid password is provided", function() {
    expect(validate("abcaabb")).to.be.true
  })
  it("returns error if password is too long", function() {
    expect(() => validate("dsfdssddsfsdfdsfsdfdsfdsfdsfdsfda")).to.throw(Error, "Password is too long")
  })
  it("returns error if password is too short", function() {
    expect(() => validate("ds")).to.throw(Error, "Password is too short")
  })
  it("returns error if password is not lower case alphabetic", function() {
    expect(() => validate("dsfdssddsfSDFDSFDSFDSF")).to.throw(Error, "Password is not lower case alphabetic")
  })
  it('returns error if password contains "i"', function() {
    expect(() => validate("dsfdsi")).to.throw(Error, 'Password cannot contain "i"')
  })
  it("returns error if password does not contain increasing straight", function() {
    expect(() => validate("xbyzu")).to.throw(Error, "Password does not contain increasing straight")
  })
  it("returns error if password does not contain two overlapping pairs", function() {
    expect(() => validate("abcdef")).to.throw(Error, "Password does not contain two overlapping pairs")
  })
})
