<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title>Livia</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <div class="scroll-container">
            <v-container fluid grid-list-xl>
                <router-view></router-view>
            </v-container>
            </div>
        </v-content>
        <v-bottom-nav :active-sync="bottomNav" app :value="true" color="grey lighten-2">
            <v-btn to="/" value="home">
                <span>Home</span>
                <v-icon medium dark>home</v-icon>
            </v-btn>
            <v-btn to="/discover" value="discover">
                <span>Discover</span>
                <v-icon medium dark>search</v-icon>
            </v-btn>
            <v-btn to="/settings" value="settings">
                <span>Settings</span>
                <v-icon medium dark>settings</v-icon>
            </v-btn>
        </v-bottom-nav> 
    </v-app>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {
            bottomNav: 'home'
        }
    }
}
</script>

<style>
.v-content {
    max-height: 100vh;
}

.scroll-container {
    height: 100%;
    overflow-y: scroll;
    backface-visibility: hidden;
}
</style>
