<template>
  <div id="app">
    <AppHeader
      @change-main-component="changeMainComponent"
    />
    <AppMain
      :component="component"
      :players="players"
      @new-player="addPlayer"
    />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppMain from './components/AppMain'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain
  },
  data () {
    return {
      component: 'SheepQuestions',
      playerIdCt: 0,
      players: []
    }
  },
  methods: {
    getPlayer (id) {
      return this.players.filter(v => v.id === id)[0]
    },
    getPlayerByName (name) {
      return this.players.filter(v => v.name.toLowerCase().strPos(name.toLowerCase) > -1)[0]
    },
    addPlayer (player) {
      let { name } = player
      this.players.push({
        id: this.playerIdCt++,
        name
      })
    },
    removePlayer (id) {

    },
    changeMainComponent (component) {
      this.component = component
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-size: 1rem;
}
ul {
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1em;
}
</style>
