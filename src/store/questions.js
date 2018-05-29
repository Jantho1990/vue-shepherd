function getSelectedPlayers(state, rootState, id) {
  console.log('fish hole',state.questions.get(id))
  return state.questions.get(id)
    .answers.map((carry, id) => {
      rootState.answers.get(id).players
    }).sort((a, b) => Number(a) > Number(b) ? 1 : -1)
    .filter((id, i, arr) => i < arr.length ? id === arr[i + 1] : true)
    .map(id => rootState.players.get(id))
}

export default {
  namespaced: true,
  state () {
    return {
      questions: new Map(),
      questionId: 0
    }
  },
  getters: {
    all: state => Array.from(state.questions.values()),
    withId: state => id => state.questions.get(id),
    selectedPlayers: (state, getters, rootState) => id => {
      return getSelectedPlayers(state, rootState, id)
    },
    unselectedPlayers: (state, getters, rootState) => id => {
      let selectedPlayers = getSelectedPlayers(state, rootState, id)
      return Array.from(Object.values(rootState.players))
        .filter(player => {
          return selectedPlayers.find(sp => sp.id === player.id) === undefined
        })
    }
  },
  mutations: {
    incrementCounter: (state) => {
      state.questionId++
    },
    store: (state, question) => {
      console.log('question', question)
      state.questions.set(question.id, question)
    },
    delete: (state, id) => {
      state.questions.delete(id)
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      let { question } = payload
      if (state.questions.get(question.id) === undefined) {
        commit('store', {
          ...question,
          id: state.questionId,
          answers: []
        })
        commit('incrementCounter')
      }
    },
    update ({ commit, state }, payload) {
      let { question } = payload
      commit('store', question)
    },
    delete ({ commit, state }, id) {
      if (state.questions.get(id) !== undefined) {
        commit('delete', id)
      } else {
        throw new Error(`Cannot delete undefined question with id ${id}`)
      }
    }
  }
}
