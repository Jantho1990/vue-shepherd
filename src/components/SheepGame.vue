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
export default {
  components: {
    SheepQuestion
  },
  data: function () {
    return {
      questions: [
        {
          id: 0,
          text: 'Is this not a question?'
        }
      ]
    }
  }
}
</script>
