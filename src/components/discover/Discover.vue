<template>

<v-layout column>
	<div class="scroll-container">
    <v-flex xs12>
        <v-layout row wrap>			
            <v-flex xs6 v-for="cat in cats"
                :key="cat._id" >
                <router-link to="/">
					<img :src=cat.url class="img-thumbnail mx-auto d-block" style="max-width:150px;max-height:150px;" />
                    <span class="subheading font-weight-bold">{{ cat.name }}</span>
                </router-link>
            </v-flex>
        </v-layout>
    </v-flex>
	</div>
</v-layout>
</template>

<script>

import { firestore } from '../../services'

export default {
    name: 'Discover',
    data () {
        return {
            loading: false,
            cats: [],
            error: null
        }
    },
    firestore () {
        return {
            cats: firestore.collection('categories')
        }
    }
}
</script>

<style>

</style>