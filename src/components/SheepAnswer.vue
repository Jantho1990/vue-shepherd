<template>
  <li class="sheep-answer">
    <div>{{ text }} -- {{ points }}</div>
    <div class="players">
      <ul>
        <li :key="player.answer" v-for="player in players">{{ player.name }}</li>
      </ul>
    </div>
    <div @keypress.enter="submitPlayerAnswer" class="add-player">
      <input type="text" name="answer-player" v-model="newPlayer">
      <button @click="submitPlayerAnswer">Add Player</button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
li.sheep-answer {
  margin: auto;
  .players ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: left;
    li {
      width: 30%;
    }
  }
}

</style>

<script>
export default {
  computed: {
    points: function () {
      return this.players.length > 0 ? this.players.length - 1 : 0
    }
  },
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
