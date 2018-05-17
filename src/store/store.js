import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    players: [],
    playerId: 0
  },
  getters: {
    players: state => {
      return state.players
    },
    player: (state, ident) => {
      return state.players.filter(p => p.id === ident || p.name === ident)
    }
  },
  mutations: {
    createPlayer: (state, player) => {
      state.players.push({id: state.playerId++, ...player})
    },
    updatePlayer: (state, player, id) => {
      state.players[id] = player
    },
    deletePlayer: (state, id) => {
      delete state.players[id]
    }
  },
  actions: {
    storePlayer ({commit, state}, player) {
      let id = state.players.findIndex(p => p.id === player.id || p.name === player.name)
      if (id > -1) {
        commit('updatePlayer', player, id)
      } else {
        commit('createPlayer', player)
      }
    },
    deletePlayer ({commit, state}, player) {
      let id = state.players.findIndex(p => p.id === player.id || p.name === player.name)
      if (id > -1) {
        commit('deletePlayer', id)
      }
    }
  }
})
