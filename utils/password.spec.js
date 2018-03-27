/* eslint-env mocha */
import { expect } from "chai"
import { tooLong, tooShort, isLowerCaseAlphabetic } from "./password"

describe("tooLong?", function() {
  it("returns true because longer than 32", function() {
    expect(tooLong("abcdefghijklmodnsfodsidsfjdsofjde")).to.equal(true)
  })
  it("returns false because shorter than 32", function() {
    expect(tooLong("abcdefghijklmodnsf")).to.equal(false)
  })
  it("returns false because exactly 32", function() {
    expect(tooLong("abcdefghijklmodnsf18273645163847")).to.equal(false)
  })
})

describe("tooShort?", function() {
  it("returns true because shorter than 3", function() {
    expect(tooShort("ab")).to.equal(true)
  })
  it("returns false because longer than 3", function() {
    expect(tooShort("abdsfdsfdsf")).to.equal(false)
  })
  it("returns false because exactly 3", function() {
    expect(tooShort("abd")).to.equal(false)
  })
})

describe("isLowerCaseAlphabetic?", function() {
  it("returns true because password only contains lower case alphabetic characters", function() {
    expect(isLowerCaseAlphabetic("absdfdsf")).to.equal(true)
  })
  it("returns false because password contains capital alphabetic characters", function() {
    expect(isLowerCaseAlphabetic("absdfdASDASDASDDADASDASsf")).to.equal(false)
  })
  it("returns false because password contains numbers", function() {
    expect(isLowerCaseAlphabetic("absdfd123489230")).to.equal(false)
  })
  it("returns false because password contains numbers and capital alphabetic characters", function() {
    expect(isLowerCaseAlphabetic("absdfdA12348923BCCA")).to.equal(false)
  })
})
