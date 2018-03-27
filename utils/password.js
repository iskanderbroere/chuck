// helper functions

export const trimPassword = pw => {
  return pw.trim()
}

export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
]

export const indexOfAlphabet = letter => {
  return alphabet.indexOf(letter)
}

export const isIncreasingStraight = (first, second, third) => {
  const firstAlphabetIndex = indexOfAlphabet(first)
  const secondAlphabetIndex = indexOfAlphabet(second)
  const thirdAlphabetIndex = indexOfAlphabet(third)
  // e.g. (d - c) === (4 - 3), if 1, next to each other
  const sumOne = secondAlphabetIndex - firstAlphabetIndex === 1
  const sumTwo = thirdAlphabetIndex - secondAlphabetIndex === 1
  return sumOne && sumTwo
}

export const isNonOverlappingPair = (first, second) => {
  const firstAlphabetIndex = indexOfAlphabet(first)
  const secondAlphabetIndex = indexOfAlphabet(second)
  return secondAlphabetIndex - firstAlphabetIndex === 0
}

// end of helper functions

export const tooLong = pw => pw.length > 32

export const tooShort = pw => pw.length < 3

export const isNotLowerCaseAlphabetic = pw => !/^[a-z]+$/.test(pw)

export const hasIllegalCharacters = pw => /i/.test(pw)

export const hasIncreasingStraight = pw => {
  // loop for every character except the last two
  const amountOfLoops = pw.length - 3
  for (let n = 0; n <= amountOfLoops; n++) {
    if (isIncreasingStraight(pw.charAt(n), pw.charAt(n + 1), pw.charAt(n + 2))) {
      return true
    }
    // only returns false if last run of loop
    if (n === amountOfLoops) {
      return false
    }
  }
}

export const hasTwoOverlappingPairs = pw => {
  const amountOfLoops = pw.length - 2
  let counter = 0
  for (let n = 0; n <= amountOfLoops; n++) {
    if (isNonOverlappingPair(pw.charAt(n), pw.charAt(n + 1))) {
      counter++
      if (counter === 2) {
        return true
      }
    }
    if (n === amountOfLoops) {
      return false
    }
  }
}

// todo
export const validatePassword = pw => {
  const trimmedPassword = trimPassword(pw)
  if (tooLong(trimmedPassword)) {
    throw new Error("Password is too long")
  }
  if (tooShort(trimmedPassword)) {
    throw new Error("Password is too short")
  }
  if (isNotLowerCaseAlphabetic(trimmedPassword)) {
    throw new Error("Password is not lower case alphabetic")
  }
  if (hasIllegalCharacters(trimmedPassword)) {
    throw new Error('Password cannot contain "i"')
  }
  if (!hasIncreasingStraight(trimmedPassword)) {
    throw new Error("Password does not contain increasing straight")
  }
  if (!hasTwoOverlappingPairs(trimmedPassword)) {
    throw new Error("Password does not contain two overlapping pairs")
  }
  return true
}

export default validatePassword
