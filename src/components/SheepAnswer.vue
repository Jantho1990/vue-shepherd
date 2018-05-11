<template>
  <li class="sheep-answer">
    <div>{{ text }}</div>
    <div class="players">
      <ul>
        <li :key="player.answer" v-for="player in players">{{ player.name }}</li>
      </ul>
    </div>
    <div @keypress.enter="submitPlayerAnswer" class="add-player">
      <label for="answer-player">Add Player</label>
      <input type="text" name="answer-player" v-model="newPlayer">
      <button @click="submitPlayerAnswer">Add Player</button>
    </div>
  </li>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  data: function () {
    return {
      newPlayer: '',
      players: []
    }
  },
  methods: {
    submitPlayerAnswer: function () {
      let newPlayer = {
        name: this.newPlayer
      }
      this.players.push(newPlayer)
      this.$emit('answer-update-newplayer', this.answer, newPlayer)
      this.newPlayer = ''
    }
  },
  props: {
    text: {
      type: String,
      required: true,
      validator: function (value) {
        return typeof value === 'string'
      }
    },
    id: {
      type: Number,
      required: true,
      validator: function (value) {
        return typeof value === 'number'
      }
    }
  }
}
</script>
