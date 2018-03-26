import localforage from "localforage"

export const state = () => ({
  quotes: [],
  favorites: []
})

export const mutations = {
  setQuotes(state, existingQuotes) {
    state.favorites = existingQuotes
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
  async getLocalQuotes({ commit }) {
    const existingQuotes = await localforage.getItem("favorites")
    if (existingQuotes) {
      commit("setQuotes", existingQuotes)
    }
  },
  addFavorite({ dispatch, state }, quote) {
    const existingQuotes = state.favorites
    // check if already favorite
    if (!existingQuotes.some(existingQuote => existingQuote.id === quote.id)) {
      dispatch("addUniqueFavorite", {
        quote: quote,
        existingQuotes: existingQuotes
      })
    }
  },
  async addUniqueFavorite({ commit }, { quote, existingQuotes }) {
    const newQuotes = existingQuotes.concat([quote])
    await commit("add", quote)
    await localforage.setItem("favorites", newQuotes)
  }
}
