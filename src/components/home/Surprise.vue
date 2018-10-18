<template>
    <v-layout column>
        <img :src="imageSrc" />
        <v-btn v-on:click="fetchCatGif" color="success">Give me a new one!</v-btn>
    </v-layout>
</template>

<script>
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
        fetchCatGif: async function () {
            let response = await fetch(
                'https://api.giphy.com/v1/gifs/random?api_key=gtENIKwn3Mm9uN4JOIlU8CHaV80XwfhN&tag=cat&rating=G'
            )
            let data = await response.json()
            this.imageSrc = data.data.image_url
        }
    },
    beforeMount () {
        this.fetchCatGif()
    }
}
</script>

<style>
</style>