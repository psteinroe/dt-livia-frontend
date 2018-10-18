<template>
    <v-layout column>
        <img :src="imageSrc" />
        <v-btn v-on:click="getUrl" color="success">Give me a new one!</v-btn>
    </v-layout>
</template>

<script>
import {api} from '../../services'
export default {
    name: 'Surprise',
    data () {
        return {
            loading: false,
            imageSrc: '',
            error: null
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

<style>
</style>