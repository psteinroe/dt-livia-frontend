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
                    solo
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    solo
                    hint="At least 6 characters"
                ></v-text-field>
            </v-flex>
            <v-layout row justify-center>
                <v-flex xs4>
                    <v-btn @click="register" block color="#42B54E" class="white--text">Register</v-btn>
                </v-flex>
            </v-layout>
            <v-layout row justify-center>
            <v-flex xs7 align-content-center text-xs-center >
                <router-link to="/Login" class="loginLink">
                    <div>
                        <span class="registerLinkI">Already a user?</span>
                        <span class="registerLinkII">Login</span>
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
    name: 'Register',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register: async function () {
            try {
                await auth.createUserWithEmailAndPassword(this.email, this.password)
                alert('Registration successful.')
                this.$router.replace('/Login')
            } catch (err) {
                alert(err.message)
                console.error(err)
            }
        }
    }
}
</script>

<style scoped>
.text {
    font-weight: 500;
}

.loginLink {
    text-decoration: none;
}

.registerLinkI {
    color: #9d9ea1;
}

.registerLinkII {
    color: #ff5959;
}
</style>