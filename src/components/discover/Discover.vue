<template>

<v-layout column>
	<div class="scroll-container">
    <v-flex xs12>
        <v-layout row wrap>			
            <v-flex xs6 v-for="cat in cats"
                :key="cat._id" >
                <router-link :to="{ name: 'articles', params: { catName: cat.name } }" class="cat-container">
					<img :src=cat.url class="rounded mx-auto d-block" style="max-width:200px;max-height:200px;" />
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
.rounded{border-radius:.25rem !important;}
a.cat-container{display:block;text-align:center;text-decoration: none;}
a.cat-container span{margin-top:-25px;display:block;color:white;}
</style>