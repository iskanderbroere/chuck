import { setLocalStorage, getLocalStorage } from "../utils/localstorage"
import { fetchOne } from "../utils/api"

export const state = () => ({
  quotes: [],
  favorites: [],
  fetchAtInterval: false
})

export const mutations = {
  setFavoriteQuotes(state, favoriteQuotes) {
    state.favorites = favoriteQuotes
  },
  // maybe destructure
  setRandomQuotes(state, randomQuotes) {
    state.quotes = randomQuotes
  },
  addRandomQuote(state, randomQuote) {
    state.quotes.unshift(randomQuote)
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
  toggleFetchAtInterval(state) {
    state.fetchAtInterval = !state.fetchAtInterval
  }
}

export const actions = {
  async fetchRandomQuotes({ commit }) {
    const data = await fetch("http://api.icndb.com/jokes/random/10")
    const { value } = await data.json()
    commit("setRandomQuotes", value)
  },
  fetchAtInterval({ commit, state }) {
    commit("toggleFetchAtInterval")
    const timer = setInterval(async () => {
      if (state.quotes.length > 9 || !state.fetchAtInterval) {
        clearInterval(timer)
        return
      }
      const startTime = Date.now()
      const quote = await fetchOne()
      const endTime = Date.now()
      console.log(endTime - startTime)
      commit("addRandomQuote", await quote)
    }, 1000)
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
