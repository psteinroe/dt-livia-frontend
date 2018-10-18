<template>
<v-layout column>
    <div class="scroll-container">
        <v-list three-line>
            <v-list-tile
                v-for="note in notes"
                :key="note._id">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ note.title }}</v-list-tile-title>
                         <v-list-tile-sub-title>{{ note.content }}</v-list-tile-sub-title>
                    </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <router-link to="/NewNote">
            <span class="subheading font-weight-bold">New Note</span>
        </router-link>
    </div>
 </v-layout>
</template>

<script>
import { firestore } from '../../services'

export default {
    name: 'Notes',
    data () {
        return {
            loading: false,
            notes: [],
            error: null
        }
    },
    firestore () {
        return {
            notes: firestore.collection('notes')
        }
    }
}
</script>

<style>

</style>