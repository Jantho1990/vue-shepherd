function getSelectedPlayers (state, rootState, id) {
  // console.log('FFFF', getters)
  console.log('FISH', state.questions[id])
  return state.questions[id]
    .answers.map((carry, id) => {
      rootState.answers[id].players
    }).sort((a, b) => Number(a) > Number(b) ? 1 : -1)
    .filter((id, i, arr) => i < arr.length ? id === arr[i + 1] : true)
    .map(id => rootState.players[id])
}

export default {
  namespaced: true,
  state () {
    return {
      questions: {},
      questionId: 0
    }
  },
  getters: {
    all: state => Array.from(Object.values(state.questions)),
    withId: state => id => state.questions[id],
    selectedPlayers: (state, getters, rootState) => id => {
      console.log('ROOTSTATE', rootState)
      return getSelectedPlayers(state, rootState, id)
    },
    unselectedPlayers: (state, getters, rootState) => id => {
      console.log('SHUT UP', rootState)
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
      // state.questions.set(question.id, question)
      state.questions[question.id] = Object.assign(
        {},
        state.questions[question.id],
        question
      )
    },
    delete: (state, id) => {
      state.questions.delete(id)
    }
  },
  actions: {
    create ({ commit, state }, payload) {
      let { question } = payload
      if (state.questions[question.id] === undefined) {
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
      if (state.questions[id] !== undefined) {
        commit('delete', id)
      } else {
        throw new Error(`Cannot delete undefined question with id ${id}`)
      }
    }
  }
}
