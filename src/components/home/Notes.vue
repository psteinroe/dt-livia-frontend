<template>
<v-layout column>
    <div class="scroll-container">
        <v-list three-line>
            <v-list-tile
                v-for="note in notes"
                :key="note._id">
                    <v-list-tile-content>
                        <v-list-tile-title class="title">{{ note.title }}</v-list-tile-title>
                        <v-list-tile-sub-title class="content">{{ note.content }}</v-list-tile-sub-title>
                    </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <router-link to="/NewNote" class="new-note">
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
            notes: firestore.collection('notes').orderBy('timestamp', 'desc')
        }
    }
}
</script>

<style>
.title {
    font-size:36px;
}
.content {
    font-size:14px;   
}
.new-note {
    position:fixed;
    right:3vw;
    bottom:10vh;
    width: 120px;
    height: 32px;
    
    color: black;
    text-decoration: none;
    text-align: center; 
    background-color:#FF5959;
    color:white;
    font-weight:bold;
    border-radius:5px;
}
</style>