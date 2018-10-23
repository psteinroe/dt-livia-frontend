<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="onBack" icon>
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <Share :title="this.note.title" :description="this.note.content"/>
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
                            <v-text-field required :rules="titleRules" class="display-1" v-model="title" placeholder="Title" autofocus />
                            <div class="subtitle">{{getTimestampFormatted(this.note)}}</div>
                            <v-textarea required :rules="contentRules" class="subheading" v-model="content" placeholder="Content" />
                        </v-form>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Share from '../Share'
import { firestore } from '../../services'
import formatter from '../../mixins/formatter'
export default {
    name: 'Note',
    components: { Share },
    mixins: [formatter],
    props: {
        noteId: {
            type: String,
            required: true
        },
        note: {
            type: Object,
            required: false
        }
    },
    data () {
        return {
            title: this.note.title,
            titleRules: [
                v => !!v || 'Title is required'
            ],
            contentRules: [
                v => !!v || 'Content is required'
            ],
            content: this.note.content,
            timestamp: this.note.timestamp,
            error: false,
            valid: false
        }
    },
    firestore () {
        return {
            notes: firestore.collection('notes').orderBy('title')
        }
    },
    methods: {
        onDelete: async function () {
            try {
                this.error = false
                if (this.noteId !== 'newnote') {
                    await firestore.collection('notes').doc(this.noteId).delete()
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
        onContext: function () {
        },
        saveNote: async function () {
            try {
                if (this.$refs.form.validate()) {
                    this.error = false
                    if (this.noteId === 'newnote') {
                        await firestore.collection('notes').add({
                            content: this.content,
                            title: this.title,
                            timestamp: new Date()
                        })
                    } else {
                        await firestore.collection('notes').doc(this.noteId).set({
                            content: this.content,
                            title: this.title,
                            timestamp: new Date()
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