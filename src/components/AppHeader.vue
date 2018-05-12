<template>
  <header class="app-header">
    <div class="logo">
      <span>SHEPHERD</span>
    </div>
    <nav class="nav">
      <ul>
        <li>Questions</li>
        <li>Players</li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header.app-header {
  background-color: hsl(146, 60%, 55%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5em;
  > * {
    padding: 1em;
    &.logo {
      justify-self: flex-start;
    }
    &.nav {
      ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        list-style: none;
      }
    }
  }
}
</style>

<script>
export default {
  
}
</script>
