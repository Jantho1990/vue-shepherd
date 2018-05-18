<template>
  <li class="sheep-answer">
    <div>{{ text }} -- {{ points }}</div>
    <div class="players">
      <multiselect
        label="name"
        v-model="selectedPlayers"
        :clear-on-select="false"
        :close-on-select="false"
        :hide-selected="true"
        :multiple=true
        :options="players"
        :searchable="true"
        track-by="name"
        @select="onPlayerAdd"
        ></multiselect>
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
import { mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  computed: {
    ...mapGetters([
      'players'
    ]),
    points: function () {
      return this.selectedPlayers.length > 0 ? this.selectedPlayers.length - 1 : 0
    }
  },
  data: function () {
    return {
      newPlayer: '',
      selectedPlayers: []
    }
  },
  methods: {
    onPlayerAdd (newPlayer) {
      console.log(arguments)
      console.log(newPlayer)
      this.$emit('answer-update-newplayer', this.id, newPlayer)
    },
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
    },
    questionId: {
      type: Number,
      required: true,
      validator: function (value) {
        return typeof value === 'number'
      }
    }
  }
}
</script>
