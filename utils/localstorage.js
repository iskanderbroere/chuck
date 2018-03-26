import localforage from "localforage"

export const setLocalStorage = async items => {
  return await localforage.setItem("favorites", items.slice(0, 10))
}
export const getLocalStorage = async key => {
  const localData = await localforage.getItem(key)
  if (localData.length) {
    return localData
  }
  return []
}
