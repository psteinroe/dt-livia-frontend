<template>
<v-app>
    <v-content>
        <v-container grid-list-xl>
    <v-layout column justify-center>
        <v-layout mt-5 row justify-center>
            <v-flex xs3></v-flex>
            <v-flex xs6>
                <v-img contain src="static/img/logo.png">
            </v-img>
            </v-flex>
            <v-flex xs3></v-flex>
        </v-layout>
        <v-flex xs12>
            <v-text-field
                label="E-Mail"
                v-model="email"
                type="text"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                label="Password"
                v-model="password"
                type="password"
            ></v-text-field>
        </v-flex>
        <v-layout row justify-center>
            <v-flex xs4>
                <v-btn @click="login" block>Login</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex xs7 align-content-center>
                <router-link to="/Register">
                    <div>Not registered yet? Do it now!</div>
                </router-link>
            </v-flex>
        </v-layout>
    </v-layout>
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import {auth} from '../services'

export default {
    name: 'Login',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login: async function () {
            try {
                await auth.signInWithEmailAndPassword(this.email, this.password)
                this.$router.replace('main')
            } catch (err) {
                console.error(err.message)
            }
        }
    }
}
</script>

<style>

</style>