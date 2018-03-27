const trimPassword = password => {
  return password.trim()
}

const alphabet = [
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

const indexOfAlphabet = letter => {
  return alphabet.indexOf(letter)
}

const isIncreasingStraight = (first, second, third) => {
  const firstAlphabetIndex = indexOfAlphabet(first)
  const secondAlphabetIndex = indexOfAlphabet(second)
  const thirdAlphabetIndex = indexOfAlphabet(third)
  const sumOne = secondAlphabetIndex - firstAlphabetIndex === 1
  const sumTwo = thirdAlphabetIndex - secondAlphabetIndex === 1
  return sumOne && sumTwo
}

export const tooLong = password => password.length > 32

export const tooShort = password => password.length < 3

export const isLowerCaseAlphabetic = password => /^[a-z]+$/.test(password)

export const hasIllegalCharacters = password => /i/.test(password)

export const hasIncreasingStraight = password => {
  // loop for every character except the last two
  const amountOfLoops = password.length - 3
  for (let n = 0; n <= amountOfLoops; n++) {
    if (isIncreasingStraight(password.charAt(n), password.charAt(n + 1), password.charAt(n + 2))) {
      return true
    }
    if (n === amountOfLoops) {
      return false
    }
  }
}
// todo
export const validatePassword = password => {
  const trimmedPassword = trimPassword(password)
  if (tooLong(trimmedPassword)) {
    return "Password is too long"
  }
  if (tooShort(trimmedPassword)) {
    return "Password is too short"
  }
  if (isLowerCaseAlphabetic(trimmedPassword)) {
    return "Password is not lower case alphabetic"
  }
  if (hasIllegalCharacters(trimmedPassword)) {
    return 'Password cannot contain "i"'
  }
}

export default validatePassword
