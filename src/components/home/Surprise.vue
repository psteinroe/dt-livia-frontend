<template>
    <v-layout align-center justify-center column>
        <img :src="imageSrc" />
        <v-flex xs12>
            <v-btn absolute color="#FF5959" dark v-on:click="getUrl">Give me a new one!</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import {api} from '../../services'
export default {
    name: 'Surprise',
    data () {
        return {
            imageSrc: ''
        }
    },
    methods: {
        getUrl: function () {
            api.methods.fetchCatGif()
                .then(data => { this.imageSrc = data })
        }
    },
    beforeMount () {
        this.getUrl()
    }
}
</script>

<style scoped>
button {
    left: 25%;
    bottom: 72px;
}
</style>