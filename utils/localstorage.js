import localforage from "localforage"

export const setLocalStorage = async items => {
  await localforage.setItem("favorites", items)
}
export const getLocalStorage = async key => {
  return await localforage.getItem(key)
}
