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

.theme--light.v-toolbar {
    color: rgba(0,0,0,0);
    background: rgba(0,0,0,0);
}

.v-toolbar {
    box-shadow: none;
}

.v-toolbar__title {
    color: #2c3e50;
}

.v-toolbar__title:not(:first-child) {
    margin-left: 0;
}

.theme--light.v-list {
    background: rgba(0,0,0,0)
}
</style>