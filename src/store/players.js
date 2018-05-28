export default {
  namespaced: true,
  state () {
    return {
      players: new Map(),
      playerId: 0
    }
  },
  getters: {
    all: state => Array.from(state.players.values()),
    withId: state => id => state.players.get(id)
  },
  mutations: {
    incrementCounter: (state) => {
      state.playerId++
    },
    store: (state, player) => {
      state.players.set(player.id, player)
    },
    delete: (state, id) => {
      state.players.delete(id)
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      let { player } = payload
      if (state.players.get(player.id) === undefined) {
        commit('store', {
          ...player,
          id: state.playerId
        })
        commit('incrementCounter')
      }
    },
    update ({ commit, state }, payload) {
      let { question } = payload
      commit('store', question)
    },
    delete ({ commit, state }, id) {
      if (state.players.get(id) !== undefined) {
        commit('delete', id)
      } else {
        throw new Error(`Cannot delete undefined player with id ${id}`)
      }
    }
  }
}
