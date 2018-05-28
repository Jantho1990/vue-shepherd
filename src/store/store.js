import Vue from 'vue'
import Vuex from 'vuex'

import answers from './answers'
import players from './players'
import questions from './questions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    answers,
    players,
    questions
  }
})
