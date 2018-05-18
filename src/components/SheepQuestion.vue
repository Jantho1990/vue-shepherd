<template>
  <div class="sheep-question">
    <div class="title">{{ text }}</div>
    <div class="sheep-answers">
      <ul>
        <SheepAnswer
          :key="answer.id"
          v-bind="answer"
          @answer-update-newplayer="answerPlayerUpdate"
          v-for="answer in answers"
        ></SheepAnswer>
      </ul>
    </div>
    <div @keypress.enter="addNewAnswer" class="sheep-answer-form">
      <input type="text" v-model="newAnswer">
      <button @click="addNewAnswer">Add Answer</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sheep-answers > ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { mapGetters } from 'vuex'
import SheepAnswer from './SheepAnswer'

export default {
  components: {
    SheepAnswer
  },
  computed: {
    ...mapGetters([
      'answers'
    ])
  },
  data: function () {
    return {
      answerIdCounter: 0, // doesn't feel right...
      newAnswer: ''
    }
  },
  methods: {
    addNewAnswer: function () {
      let newAnswer = {
        id: this.answerIdCounter,
        text: this.newAnswer
      }
      this.$store.dispatch('storeAnswer', newAnswer)
      this.newAnswer = ''
    },
    answerPlayerUpdate: function (answer, newPlayer) {
      let i = this.answers.findIndex(v => v.id === answer.id)
      this.answers[i].players.push(newPlayer)
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
      validator: function (value) {
        return typeof value === 'number'
      }
    },
    text: {
      type: String,
      required: true,
      validator: function (value) {
        return typeof value === 'string'
      },
      default: 'Is this a question?'
    }
  }
}
</script>
