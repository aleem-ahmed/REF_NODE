<template>
  <div id="app">
    <Front-page />
  </div>
</template>

<script>
import FrontPage from './pages/FrontPage'
export default {
  name: 'App',
  components: {
    FrontPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
