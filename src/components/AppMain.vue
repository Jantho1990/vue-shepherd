<template>
  <main>
    <div
      :is="component"
      :players="players"
      @new-player="newPlayer"
    ></div>
  </main>
</template>

<style lang="scss">
main {
  margin-top: 5em;
}
</style>

<script>
import SheepLeaderboard from './SheepLeaderboard'
import SheepPlayers from './SheepPlayers'
import SheepQuestions from './SheepQuestions'

export default {
  name: 'SheepMain',
  components: {
    SheepLeaderboard,
    SheepPlayers,
    SheepQuestions
  },
  data () {
    return {
      //
    }
  },
  methods: {
    newPlayer (player) {
      this.$emit('new-player', player)
    }
  },
  props: {
    component: {
      type: String,
      required: true,
      default: 'SheepQuestions',
      validator: (value) => Object.keys(this.a.components).reduce((c, v) => c ? true : v === value, false)
    },
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
