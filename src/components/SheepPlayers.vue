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
      <input type="text" v-model="newPlayer">
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
      //
    }
  },
  methods: {
    //
  },
  props: {
    players: {
      type: Array,
      required: true,
      validator (value) {
        return Array.isArray(value)
      }
    }
  }
}
</script>
