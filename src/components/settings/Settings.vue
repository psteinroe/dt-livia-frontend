<template>
<v-layout>
    <v-flex xs12>
<v-list one-line subheader>
          <v-subheader>E-Mail Notifications</v-subheader>

          <v-list-tile>
            <v-list-tile-action>
                <v-checkbox v-model="news"/>
            </v-list-tile-action>
            <v-list-tile-content @click.prevent="news = !news">
              <v-list-tile-title>Really, really big news</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-action>
                <v-checkbox v-model="events"/>
            </v-list-tile-action>
            <v-list-tile-content @click.prevent="events = !events">
              <v-list-tile-title>Events and Reminders</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
                <v-checkbox v-model="updates"/>
            </v-list-tile-action>
            <v-list-tile-content @click.prevent="updates = !updates">
              <v-list-tile-title>News updates and recommendations</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
                <v-checkbox v-model="newsletter"/>
            </v-list-tile-action>
            <v-list-tile-content @click.prevent="newsletter = !newsletter">
              <v-list-tile-title>Livia Newsletter</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-list
          subheader
          one-line
        >
          <v-subheader>Account</v-subheader>

          <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title>Personal Information</v-list-tile-title> 
            </v-list-tile-content>
            <v-list-tile-action>
                <v-icon>keyboard_arrow_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title @click="logout" class="red--text">Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
    </v-flex>
</v-layout>
</template>

<script>
import {auth} from '../../services'

export default {
    name: 'Settings',
    data () {
        return {
            news: false,
            events: false,
            updates: false,
            newsletter: false
        }
    },
    methods: {
        logout: async function () {
            await auth.signOut().then(function () {
                // success
            }, function (error) {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
</style>