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

export const tooLong = password => password.length > 32
export const tooShort = password => password.length < 3
export const isLowerCaseAlphabetic = password => !password.match(/^[a-z]+$/)
export const hasIllegalCharacters = password => !password.match(/^[i]+$/)

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
