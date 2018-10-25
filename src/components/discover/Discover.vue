<template>
    <v-layout column>
        
    </v-layout>
</template>

<script>
import { firestore } from '../../services'
export default {
    name: 'Discover',
    data () {
        return {
            loading: false,
            categories: [],
            error: null
        }
    },
    firestore () {
        return {
            categories: firestore.collection('categories')
        }
    }
}
</script>

<style>

</style>