<template>
  <div class="sheep-player">
    <h2>{{ name }}</h2>
    <font-awesome-icon :icon="icon" @click="deletePlayer(id)"/>
  </div>
</template>

<style lang="scss" scoped>
.sheep-player {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 20rem;
  margin: auto;
  > * {
    margin: 0 1em;
  }
}
</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'
export default {
  name: 'SheepPlayer',
  components: {
    FontAwesomeIcon
  },
  computed: {
    icon () {
      return faTimes
    }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    deletePlayer (id) {
      let player = this.$store.getters.player(id)
      this.$store.dispatch('deletePlayer', player)
    }
  },
  props: {
    name: {
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
