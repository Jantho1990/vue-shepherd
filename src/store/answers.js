import VueMap from './proxy'

export default {
  namespaced: true,
  state () {
    return {
      answers: new Map(),
      answerId: 0,
      timestamp: 0
    }
  },
  getters: {
    all: state => state.timestamp && Array.from(state.answers.values()),
    forQuestion: state => questionId => {
      console.log('Mark', state.answers)
      console.log('Alba', state.answers.set('rip', 'tear'))
      state.answers.set('test', 'value')
      return state.timestamp && Array.from(state.answers.values())
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
      state.answers.set('Haaa', 'booom')
      console.log('RABIES', state.answers._timestamp, state.answers)
      state.timestamp = Date.now()
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
