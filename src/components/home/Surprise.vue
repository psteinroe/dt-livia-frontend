<template>
    <v-layout align-center justify-center column>
        <img :src="imageSrc" />
        <v-flex xs12>
            <v-btn v-on:click="getUrl" color="success">Give me a new one!</v-btn>
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
    position: absolute;
    right: 25%;
    bottom: 72px;
}
</style>