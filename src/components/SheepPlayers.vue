<template>
  <div class="sheep-question">
    <div class="title">Sheep Players</div>
    <div class="sheep-players">
      <ul>
        <SheepPlayer
          :key="player.id"
          v-bind="player"
          v-for="player in players"
        ></SheepPlayer>
      </ul>
    </div>
    <div @keypress.enter="addNewPlayer" class="sheep-player-form">
      <input type="text" v-model="newPlayerName">
      <button @click="addNewPlayer">Add Player</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import SheepPlayer from './SheepPlayer'

export default {
  name: 'SheepPlayers',
  components: {
    SheepPlayer
  },
  data: function () {
    return {
      newPlayerName: ''
    }
  },
  methods: {
    addNewPlayer () {
      let newPlayer = {
        name: this.newPlayerName
      }
      this.$emit('new-player', newPlayer)
      this.newPlayerName = ''
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
