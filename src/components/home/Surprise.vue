<template>
<v-app>
    <v-toolbar app>
        <v-btn @click="$router.go(-1)" icon>
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>Home</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <v-layout column>
            <v-layout row>
                <v-flex xs12>
                    <div class="text-xs-center">
                        <v-img :src="imageSrc" contain/>
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-btn absolute color="#FF5959" dark v-on:click="getUrl">Give me a new one!</v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-content>
</v-app>
</template>

<script>
import {api} from '../../services'

export default {
    name: 'Surprise',
    mixins: [api],
    data () {
        return {
            imageSrc: '',
            lazy: 'https://media.giphy.com/media/cZDRRGVuNMLOo/giphy.gif'
        }
    },
    methods: {
        getUrl: async function () {
            try {
                const sImgSrc = await this.fetchCatGif()
                this.imageSrc = sImgSrc
            } catch (err) {
                this.imageSrc = this.lazy
            }
        }
    },
    created () {
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