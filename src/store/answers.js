export default {
  namespaced: true,
  state () {
    return {
      answers: {},
      answerId: 0,
      updated: false
    }
  },
  getters: {
    all: state => Array.from(state.answers),
    forQuestion: state => questionId => {
      console.log('ANSWERS', state.answerId, Array.from(Object.values(state.answers)))
      return Array.from(Object.values(state.answers))
        .filter(answer => answer.questionId === questionId)
    },
    withId: state => id => {
      console.log('AAAGH', state.answers[id])
      return state.answers[id]},
    getAnswerPlayers: (state, getters) => id => {
      return state.answers[id].players
        .map(id => getters.players.withId(id))
    }
  },
  mutations: {
    incrementCounter: (state) => {
      state.answerId++
    },
    store: (state, answer) => {
      console.log('answer', answer)
      state.answers[answer.id] = Object.assign(
        {},
        state.answers[answer.id],
        answer
      )
    },
    delete: (state, id) => {
      state.answers.delete(id)
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      let { answer } = payload
      console.log('hello', answer)
      if (state.answers[answer.id] === undefined) {
        commit('store', {
          ...answer,
          id: state.answerId,
          players: []
        })
        commit('incrementCounter')
      }
    },
    update ({ commit, state }, payload) {
      let { question } = payload
      commit('store', question)
    },
    delete ({ commit, state }, id) {
      if (state.answers[id] !== undefined) {
        commit('delete', id)
      } else {
        throw new Error(`Cannot delete undefined answer with id ${id}`)
      }
    }
  }
}
