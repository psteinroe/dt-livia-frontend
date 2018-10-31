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
        <v-bottom-nav :active-sync="bottomNav" app :value="true" color="#f8f8f8">
            <v-btn to="/" value="home">
                <span class="navText">Home</span>
                <v-icon medium color="#FF5959">home</v-icon>
            </v-btn>
            <v-btn to="/discover" value="discover">
                <span class="navText">Discover</span>
                <v-icon medium color="#FF5959">search</v-icon>
            </v-btn>
            <v-btn to="/settings" value="settings">
                <span class="navText">Settings</span>
                <v-icon medium color="#FF5959">settings</v-icon>
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

.navText {
    color: #ff5959;
    font-weight: 700;
}

.v-toolbar__title {
    font-weight: 900;
    font-size: 2rem;
}
</style>
