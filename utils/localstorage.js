import localforage from "localforage"

export const setLocalStorage = async items => {
  return await localforage.setItem("favorites", items.slice(0, 10))
}
export const getLocalStorage = async key => {
  return await localforage.getItem(key)
}
