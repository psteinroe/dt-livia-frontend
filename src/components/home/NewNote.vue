<template>
<v-layout column>
    <div class="scroll-container">
        <v-flex xs12> 
            <form @submit="addNote(content, title)">
                <input v-model="title" placeholder="Title">
                <br>
                <textarea v-model="content" placeholder="Content"/>
                <button type="submit">Add Note</button>
                <p>title is: {{ title }} / content is {{ content }} / timestamp {{ time }} </p>
                <p> {{ success }} </p>
            </form>
        </v-flex>
    </div>
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
            title: '',
            content: '',
            success: '',
            time: new Date()
        }
    },
    firestore () {
        console.log(firestore)
        return {
            notes: firestore.collection('notes').orderBy('title')
        }
    },
    methods: {
        addNote: function (content, title) {
            const timestamp = new Date()
            this.success = 'waiting...'
            firestore.collection('notes').add({
                title: 'Tokyo',
                content: 'Japan',
                timestamp: timestamp
            }).then(function (docRef) {
                this.success = 'worked'
                console.log('worked with ' + docRef.id)
            }).catch(function (error) {
                console.error('Error writing document: ', error)
                this.success = 'NO!'
            })
            /* if (firestore.collection('notes').add({ content, title, timestamp })) {
                firestore.collection('notes').add({ content, title, timestamp })
                this.success = 'worked'
            } else {
                this.success = 'NO!'
            } */
        }
    }
}
</script>

<style>

</style>