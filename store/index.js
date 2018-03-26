import { setLocalStorage, getLocalStorage } from "../utils/localstorage"
import { fetchOne } from "../utils/api"

export const state = () => ({
  quotes: [],
  favorites: [],
  fetching: false
})

export const mutations = {
  setFavoriteQuotes(state, favoriteQuotes) {
    state.favorites = favoriteQuotes
  },
  setRandomQuotes(state, randomQuotes) {
    state.quotes = randomQuotes
  },
  addRandomQuote(state, randomQuote) {
    state.quotes.unshift(randomQuote)
  },
  // refactor to action maybe
  addFavoriteQuote(state, quote) {
    state.quotes = state.quotes.map(q => {
      if (q.id === quote.id) {
        return { ...q, favorite: true }
      }
      return q
    })
    if (state.favorites.length > 9) {
      state.favorites = state.favorites.slice(0, 9)
    }
    state.favorites.unshift(quote)
  },
  // refactor to action maybe
  removeFavoriteQuote(state, { quoteindex, quote }) {
    state.quotes = state.quotes.map(q => {
      if (q.id === quote.id) {
        return { ...q, favorite: false }
      }
      return q
    })
    state.favorites.splice(quoteindex, 1)
    setLocalStorage(state.favorites)
  },
  toggleFetchAtInterval(state) {
    state.fetching = !state.fetching
  }
}

export const actions = {
  async fetchRandomQuotes({ commit }) {
    const data = await fetch("http://api.icndb.com/jokes/random/10")
    const { value } = await data.json()
    const quotes = value.map(quote => {
      return { ...quote, favorite: false }
    })
    commit("setRandomQuotes", quotes)
  },
  fetchAtInterval({ commit, state }) {
    commit("toggleFetchAtInterval")
    const timer = setInterval(async () => {
      // hmm
      if (state.quotes.length > 9) {
        commit("toggleFetchAtInterval")
        clearInterval(timer)
        return
      }
      if (!state.fetching) {
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
