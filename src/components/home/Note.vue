<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="onBack" icon>
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <Share :title="this.title" :description="this.content"/>
                <v-btn @click="onDelete" icon>
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container>
                <v-layout column>
                    <v-flex xs12>
                        <v-alert
                            v-if="this.error"
                            :value="true"
                            type="error">
                            Error saving the note. Please try again.
                        </v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-form ref="form" v-model="valid">
                            <v-text-field required :rules="titleRules" class="display-1" v-model="note.title" placeholder="Title" autofocus />
                            <div v-if="this.note.timestamp" class="subtitle">{{getTimestampFormatted(this.note.timestamp)}}</div>
                            <v-textarea required :rules="contentRules" class="subheading" v-model="note.content" placeholder="Content" />
                        </v-form>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Share from '../Share'
import formatter from '../../mixins/formatter'
import {firestore} from '../../services'
export default {
    name: 'Note',
    components: { Share },
    mixins: [formatter],
    props: {
        noteId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        content: {
            type: String,
            required: false,
            default: ''
        },
        timestamp: {
            type: Object,
            required: false
        }
    },
    data () {
        return {
            note: {
                id: this.noteId,
                title: this.title,
                content: this.content,
                timestamp: this.timestamp
            },
            titleRules: [
                v => !!v || 'Title is required'
            ],
            contentRules: [
                v => !!v || 'Content is required'
            ],
            error: false,
            valid: false
        }
    },
    methods: {
        onDelete: async function () {
            try {
                this.error = false
                if (this.noteId !== 'newnote') {
                    await firestore.collection('users').doc(this.$userId).collection('activities').doc(this.note.id).delete()
                }
                this.$router.go(-1)
            } catch (err) {
                console.error(err.message)
                this.error = true
            }
        },
        onBack: async function () {
            await this.saveNote()
            this.$router.go(-1)
        },
        saveNote: async function () {
            try {
                if (this.$refs.form.validate()) {
                    this.error = false
                    if (this.note.id === 'newnote') {
                        await firestore.collection('users').doc(this.$userId).collection('activities').add({
                            content: this.note.content,
                            title: this.note.title,
                            timestamp: new Date(),
                            type: 'note'
                        })
                    } else {
                        await firestore.collection('users').doc(this.$userId).collection('activities').doc(this.note.id).set({
                            content: this.note.content,
                            title: this.note.title,
                            timestamp: new Date(),
                            type: 'note'
                        })
                    }
                }
            } catch (err) {
                console.error(err.message)
                this.error = true
            }
        }
    }
}
</script>


<style>

</style>