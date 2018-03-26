import { setLocalStorage, getLocalStorage } from "../utils/localstorage"

export const state = () => ({
  quotes: [],
  favorites: []
})

export const mutations = {
  setFavorites(state, favoriteQuotes) {
    state.favorites = favoriteQuotes
  },
  setRandomQuotes(state, randomQuotes) {
    state.quotes = randomQuotes
  },
  add(state, quote) {
    if (state.favorites.length > 9) {
      state.favorites = state.favorites.slice(0, 9)
    }
    state.favorites.unshift(quote)
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
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
    const existingQuotes = await getLocalStorage("favorites")
    if (existingQuotes) {
      commit("setFavorites", existingQuotes)
    }
  },
  addUniqueFavorite({ dispatch, state }, quote) {
    const existingQuotes = state.favorites
    // check if already favorite
    if (!existingQuotes.some(existingQuote => existingQuote.id === quote.id)) {
      dispatch("addFavorite", {
        quote: quote,
        existingQuotes: existingQuotes
      })
    }
  },
  async addFavorite({ commit }, { quote, existingQuotes }) {
    const newQuotes = [quote].concat(existingQuotes)
    setLocalStorage(newQuotes)
    await commit("add", quote)
  }
}
