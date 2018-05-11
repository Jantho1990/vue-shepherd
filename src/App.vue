<template>
  <div id="app">
    <img src="./assets/logo.png">
    <SheepQuestion/>
  </div>
</template>

<script>
import SheepQuestion from './components/SheepQuestion'

export default {
  name: 'App',
  components: {
    SheepQuestion
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
