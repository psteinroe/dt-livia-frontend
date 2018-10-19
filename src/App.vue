<template>
    <router-view />
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            bottomNav: 'home'
        }
    }
}
</script>

<style>
html, body {
    margin: 0; 
    padding: 0;
    height: 100%; 
    overflow: hidden
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>