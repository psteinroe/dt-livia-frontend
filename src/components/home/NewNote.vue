<template>
<v-layout column>
    <div class="scroll-container">
        <v-flex xs12> 
            <form @submit.prevent="addNote(content, title)" class="s">
                <input class="input-field input-title" v-model="title" placeholder="Title" required full-width autofocus>
                <br>
                <textarea class="input-content" v-model="content" placeholder="Content" required/>
                <button type="submit" class="add-note">Save Note</button>
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
            this.$router.go(-1)
        },
        updateNote: function (content, title) {
            var noteRef = firestore.collection('notes').doc('sas')
            // Set the "note" field of the city 'DC'
            return noteRef.update({
                content: this.content,
                title: this.title
            }).then(function () {
                console.log('Document successfully updated!')
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error('Error updating document: ', error)
            })
        }
    }
}
</script>

<style>
.input-title {
    width:80%;
    background-color: 2px solid rgba(243, 243, 243, .8);
    border-radius:5px;
    font-size: 32px;
}
.input-content {
    width:100%;
    height:40vh;
    font-size: 16px;
}
.add-note {
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