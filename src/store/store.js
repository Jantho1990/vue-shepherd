import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    answers: [],
    answerId: 0,
    players: [],
    playerId: 0
  },
  getters: {
    answer: (state) => (questionId, ident) => {
      return state.answers.filter(a => a.questionId === questionId)
        .find(a => a.id === ident)
    },
    answers: state => (questionId) => {
      return state.answers.filter(a => a.questionId === questionId)
    },
    player: (state) => (ident) => {
      return state.players.find(p => p.id === ident)
    },
    players: state => {
      return state.players
    }
  },
  mutations: {
    createAnswer: (state, answer) => {
      state.answers.push({
        id: state.answerId++,
        ...answer
      })
    },
    updateAnswer: (state, {answer, id}) => {
      state.answers[id] = {
        ...state.answers[id],
        ...answer
      }
    },
    deleteAnswer: (state, id) => {
      state.answers.splice(id, 1)
    },
    createPlayer: (state, player) => {
      state.players.push({
        id: state.playerId++,
        ...player
      })
    },
    updatePlayer: (state, player, id) => {
      state.players[id] = player
    },
    deletePlayer: (state, id) => {
      state.players.splice(id, 1)
    }
  },
  actions: {
    storeAnswer ({ commit, state }, payload) {
      let { questionId, answer } = payload
      console.log('answer', answer)
      let id = state.answers.filter(a => a.questionId === questionId)
        .find(a => a.id === answer.id)
      if (typeof id !== 'undefined') {
        console.log('lark', id)
        commit('updateAnswer', answer, id)
      } else {
        console.log('moon', id, answer)
        // TODO: Figure out a better solution for injecting players...
        commit('createAnswer', answer)
      }
    },
    deleteAnswer ({ commit, state }, answer) {
      let id = state.answers.findIndex(a => a.id === answer.id)
      if (id > -1) {
        commit('deleteAnswer', id)
      }
    },
    storePlayer ({ commit, state }, player) {
      let id = state.players.findIndex(p => p.id === player.id || p.name === player.name)
      if (id > -1) {
        commit('updatePlayer', player, id)
      } else {
        commit('createPlayer', player)
      }
    },
    deletePlayer ({ commit, state }, player) {
      let id = state.players.findIndex(p => p.id === player.id)
      if (id > -1) {
        commit('deletePlayer', id)
      }
    }
  }
})
