<template>
<v-layout column>
    <div class="scroll-container">
        <v-flex xs12> 
            <form @submit.prevent="addNote(content, title)">
                <input class="input-field col s12" v-model="title" placeholder="Title" required>
                <br>
                <textarea v-model="content" placeholder="Content"/>
                <button type="submit">Add Note</button>
                <p> {{ success }} </p>
            </form>
        </v-flex>
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
        console.log(firestore.collection('notes'))
        return {
            notes: firestore.collection('notes').orderBy('title')
        }
    },
    methods: {
        addNote: function (content, title) {
            const timestamp = new Date()
            this.success = 'waiting...'
            firestore.collection('notes').add({
                content,
                title,
                timestamp
            }).then(function (docRef) {
                console.log('worked with ' + docRef.id)
            }).catch(function (error) {
                console.error('Error writing document: ', error)
            })
            this.success = 'Done.'
        }
    }
}
</script>

<style>

</style>