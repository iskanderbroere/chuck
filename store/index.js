import localforage from "localforage"

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
    state.favorites.push(quote)
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
    const existingQuotes = await localforage.getItem("favorites")
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
    const newQuotes = existingQuotes.concat([quote])
    await commit("add", quote)
    await localforage.setItem("favorites", newQuotes)
  }
}
