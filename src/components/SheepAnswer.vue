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
        :options="unselectedPlayers"
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
      'players',
      'answers'
    ]),
    points: function () {
      return this.selectedPlayers.length > 0 ? this.selectedPlayers.length - 1 : 0
    },
    selectedPlayers () {
      return this.$store.getters['answers/getAnswerPlayers'](this.id)
    },
    unselectedPlayers () {
      return this.$store.getters['questions/unselectedPlayers'](this.questionId)
    }
  },
  data: function () {
    return {
      newPlayer: ''
    }
  },
  methods: {
    onPlayerAdd (newPlayer) {
      this.$emit('answer-update-newplayer', this.id, newPlayer)
    },
    submitPlayerAnswer: function () {
      let newPlayer = {
        name: this.newPlayer
      }
      this.players.push(newPlayer)
      this.$emit('answer-update-newplayer', this.answer, newPlayer)
      this.newPlayer = ''
    },
    getSelectedPlayers () {
      let playerIds = this.$store.getters.answer(this.questionId, this.id).players
      return playerIds.map(id => this.$store.getters.players.find(player => player.id === id))
    },
    getUnselectedPlayers () {
      let allSelectedPlayers = this.answers(this.questionId).reduce((carry, answer) => {
        answer.players.forEach(playerId => {
          if (carry.length === 0 || carry.find(id => id === playerId) === undefined) {
            carry.push(playerId)
          }
        })
        return carry
      }, [])
      // if (allSelectedPlayers.length === 0) return this.players
      return this.players.filter(player => {
        if (allSelectedPlayers.find(id => id === player.id) === undefined) {
          return true
        }
        return false
      })
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
