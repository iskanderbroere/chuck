const trimPassword = password => {
  return password.trim()
}

const passwordToArray = password => {
  return password.split("")
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
  console.log(firstAlphabetIndex, secondAlphabetIndex, thirdAlphabetIndex)
  const sumOne = secondAlphabetIndex - firstAlphabetIndex === 1
  const sumTwo = thirdAlphabetIndex - secondAlphabetIndex === 1
  return sumOne && sumTwo
}

export const tooLong = password => password.length > 32

export const tooShort = password => password.length < 3

export const isLowerCaseAlphabetic = password => /^[a-z]+$/.test(password)

export const hasIllegalCharacters = password => !password.match(/^[i]+$/)

export const hasIncreasingStraight = password => {
  const passwordArray = passwordToArray(password)
  const passwordLength = passwordArray.length - 3
  for (let n = 0; n <= passwordLength; n++) {
    const firstLetter = passwordArray[n]
    const secondLetter = passwordArray[n + 1]
    const thirdLetter = passwordArray[n + 2]
    if (isIncreasingStraight(firstLetter, secondLetter, thirdLetter)) {
      return true
    }
    if (n === passwordLength) {
      return false
    }
  }
}
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
