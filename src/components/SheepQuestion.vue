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
import SheepAnswer from './SheepAnswer'

export default {
  components: {
    SheepAnswer
  },
  computed: {
    answers () {
      return this.$store.getters['answers/forQuestion'](this.id)
    }
  },
  data: function () {
    return {
      newAnswer: ''
    }
  },
  methods: {
    addNewAnswer: function () {
      let newAnswer = {
        text: this.newAnswer,
        questionId: this.id,
        players: []
      }
      console.log('newAnswer', newAnswer)
      this.$store.dispatch('answers/create', {
        answer: {
          questionId: this.id,
          ...newAnswer
        }
      })
      this.newAnswer = ''
    },
    answerPlayerUpdate: function (answerId, newPlayer) {
      // let i = this.answers.findIndex(v => v.id === answer.id)
      // this.answers[i].players.push(newPlayer)
      console.log('ninnies', newPlayer.name)
      let answer = this.$store.answers.getters.withId(answerId)
      console.log(answer)
      let updatedAnswer = {
        ...answer,
        players: [
          ...answer.players,
          newPlayer.id
        ]
      }
      console.log('sissies')
      this.$store.dispatch('answers/update', {
        questionId: this.id,
        answer: updatedAnswer
      })
    },
    getSelectedPlayers () {
      this.$store.questions.getSelectedPlayers(this.id)
    },
    getUnselectedPlayers () {
      this.$store.questions.getUnselectedPlayers(this.id)
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
