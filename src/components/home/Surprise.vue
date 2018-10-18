<template>
    <v-layout column>
        <v-layout row>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-img :src="imageSrc" lazy-src="lazy" contain/>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-btn absolute color="#FF5959" dark v-on:click="getUrl">Give me a new one!</v-btn>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import {api} from '../../services'
export default {
    name: 'Surprise',
    data () {
        return {
            imageSrc: '',
            lazy: 'https://media.giphy.com/media/cZDRRGVuNMLOo/giphy.gif'
        }
    },
    methods: {
        getUrl: function () {
            api.methods.fetchCatGif()
                .then(data => { this.imageSrc = data })
                .catch(reason => { this.imageSrc = 'https://media1.giphy.com/media/9r6EEb8o1bJFQeHTxP/giphy.gif' })
        }
    },
    beforeMount () {
        this.getUrl()
    }
}
</script>

<style scoped>
button {
    bottom: 64px;
    left: 25%;
}
</style>