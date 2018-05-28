export default {
  namespaced: true,
  state () {
    return {
      answers: new Map(),
      answerId: 0
    }
  },
  getters: {
    all: state => Array.from(state.answers.values()),
    forQuestion: state => questionId => {
      return Array.from(state.answers.values())
        .filter(answer => answer.questionId === questionId)
    },
    withId: state => id => state.answers.get(id),
    getAnswerPlayers: (state, getters) => id => {
      return state.answers.get(id).players
        .map(id => getters.players.withId(id))
    }
  },
  mutations: {
    incrementCounter: (state) => {
      state.answerId++
    },
    store: (state, answer) => {
      state.answers.set(answer.id, answer)
    },
    delete: (state, id) => {
      state.answers.delete(id)
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      let { answer } = payload
      console.log('hello', answer)
      if (state.answers.get(answer.id) === undefined) {
        commit('store', {
          ...answer,
          id: state.answerId
        })
        commit('incrementCounter')
      }
    },
    update ({ commit, state }, payload) {
      let { question } = payload
      commit('store', question)
    },
    delete ({ commit, state }, id) {
      if (state.answers.get(id) !== undefined) {
        commit('delete', id)
      } else {
        throw new Error(`Cannot delete undefined answer with id ${id}`)
      }
    }
  }
}
