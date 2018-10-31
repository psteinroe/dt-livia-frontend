<template>
<v-app>
    <v-content class="text">
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
                solo
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                label="Password"
                v-model="password"
                type="password"
                solo
            ></v-text-field>
        </v-flex>
        <v-layout row justify-center>
            <v-flex xs4 align-content-center text-xs-center>
                <v-btn @click="login" color="#42B54E" class="white--text">Login</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex xs7 align-content-center text-xs-center>
                <router-link to="/Register" class="registerLink">
                    <div>
                        <span class="registerLinkI">Don't have an account?</span>
                        <span class="registerLinkII">Sign up</span>
                        </div>
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
                this.$router.replace('/')
            } catch (err) {
                alert(err.message)
                console.error(err.message)
            }
        }
    }
}
</script>

<style scoped>
.text {
    font-weight: 500;
}
.registerLink {
    text-decoration: none;
}

.registerLinkI {
    color: #9d9ea1;
}

.registerLinkII {
    color: #ff5959;
}
</style>