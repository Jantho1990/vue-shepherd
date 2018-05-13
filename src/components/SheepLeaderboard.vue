<template>
  <div class="sheep-leaderboard">
    <h1>Leaderboard</h1>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'SheepLeaderboard',
  data () {
    return {
      //
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
