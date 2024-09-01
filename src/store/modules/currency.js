export default {
  // namespaced: true,
  state: {
    currency: localStorage.getItem('currency') || 'RUB',
  },

  mutations: {
    CHANGE_CURRENCY (state, payload) {
      state.currency = payload
      localStorage.setItem('currency', state.currency)
    },
  },

  getters: {
    getCurrency (state) {
      return state.currency
    },
  },

  actions: {
    changeCurrency ({ commit }, currency) {
      commit('CHANGE_CURRENCY', currency)
    },
  }
}
