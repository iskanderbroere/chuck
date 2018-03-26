import localforage from "localforage"

export const state = () => ({
  quotes: [],
  favorites: []
})

export const mutations = {
  setQuotes(state, existingQuotes) {
    state.favorites = existingQuotes
  },
  add(state, newQuotes) {
    state.favorites = newQuotes
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
      const newQuotes = existingQuotes.concat([quote])
      dispatch("addUniqueFavorite", newQuotes)
    }
  },
  async addUniqueFavorite({ commit }, newQuotes) {
    await commit("add", newQuotes)
    await localforage.setItem("favorites", newQuotes)
  }
}
