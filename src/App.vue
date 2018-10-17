<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="$router.go(-1)" v-if="this.$route.meta.showBackButton" icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{this.$route.meta.title}}</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container grid-list-xl>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-bottom-nav :active-sync="bottomNav" app :value="true" color="grey lighten-2">
            <v-btn to="/" value="home">
                <span>Home</span>
                <v-icon medium dark>home</v-icon>
            </v-btn>
            <v-btn to="/Discover" value="discover">
                <span>Discover</span>
                <v-icon medium dark>search</v-icon>
            </v-btn>
            <v-btn to="/Settings" value="settings">
                <span>Settings</span>
                <v-icon medium dark>settings</v-icon>
            </v-btn>
        </v-bottom-nav> 
    </v-app>
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