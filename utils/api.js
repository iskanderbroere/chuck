export const fetchOne = async () => {
  const data = await fetch("http://api.icndb.com/jokes/random/1")
  const { value } = await data.json()
  return value[0]
}
