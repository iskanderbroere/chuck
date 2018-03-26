import { setLocalStorage, getLocalStorage } from "../utils/localstorage"

export const state = () => ({
  quotes: [],
  favorites: []
})

export const mutations = {
  setFavoriteQuotes(state, favoriteQuotes) {
    state.favorites = favoriteQuotes
  },
  setRandomQuotes(state, randomQuotes) {
    state.quotes = randomQuotes
  },
  addFavoriteQuote(state, quote) {
    if (state.favorites.length > 9) {
      state.favorites = state.favorites.slice(0, 9)
    }
    state.favorites.unshift(quote)
  },
  removeFavoriteQuote(state, quoteindex) {
    state.favorites.splice(quoteindex, 1)
    setLocalStorage(state.favorites)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
  async fetchRandomQuotes({ commit }) {
    const data = await fetch("http://api.icndb.com/jokes/random/10")
    const { value } = await data.json()
    commit("setRandomQuotes", value)
  },
  async getLocalQuotes({ commit }) {
    commit("setFavoriteQuotes", await getLocalStorage("favorites"))
  },
  addFavoriteQuote({ commit, state }, quote) {
    const existingQuotes = state.favorites
    // check if already favorite
    if (!existingQuotes.some(existingQuote => existingQuote.id === quote.id)) {
      const newQuotes = [quote].concat(existingQuotes)
      setLocalStorage(newQuotes)
      commit("addFavoriteQuote", quote)
    }
  }
}
