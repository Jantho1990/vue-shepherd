<template>
  <div id="app">
    <AppHeader/>
    <AppMain/>
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
