<template>
  <div class="sheep-question">
    <div class="title">{{ question }}</div>
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
    <div class="sheep-answer-form">
      <input type="text" v-model="newAnswer">
      <button @click="addNewAnswer">Add Answer</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import SheepAnswer from './SheepAnswer'

export default {
  components: {
    SheepAnswer
  },
  data: function () {
    return {
      answerIdCounter: 0, // doesn't feel right...
      answers: [],
      newAnswer: ''
    }
  },
  methods: {
    addNewAnswer: function () {
      this.answerIdCounter++
      this.answers.push({
        id: this.answerIdCounter,
        text: this.newAnswer
      })
      this.newAnswer = ''
    },
    answerPlayerUpdate: function (answer, newPlayer) {
      let i = this.answers.findIndex(v => v.id === answer.id)
      this.answers[i].players.push(newPlayer)
    }
  },
  props: {
    question: {
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
