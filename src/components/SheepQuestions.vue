<template>
  <div class="sheep-game">
    <SheepQuestion
      :key="question.id"
      v-bind="question"
      v-for="question in questions"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import SheepQuestion from './SheepQuestion'
import { mapGetters } from 'vuex'

export default {
  name: 'SheepQuestions',
  components: {
    SheepQuestion
  },
  created () {
    // Temporary hack until we get a legit question form
    let questions = [
      {
        // id: 0,
        text: 'Is this not a question?'
      },
      {
        // id: 1,
        text: 'Favorite part of the body?'
      }
    ]
    questions.forEach(question => {
      this.$store.dispatch('questions/create', {
        question: {
          ...question
        }
      })
    })
  },
  computed: {
    ...mapGetters({
      questions: 'questions/all'
    })
  },
  data () {
    return {
      questions: this.questions.all
    }
  },
  props: {
    players: {
      type: Array,
      required: true,
      default () { return [] },
      validator (value) {
        return Array.isArray(value)
      }
    }
  }
}
</script>
