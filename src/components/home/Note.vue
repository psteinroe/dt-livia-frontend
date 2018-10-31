<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="onBack" icon>
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn @click.stop="dialog=true" icon>
                    <v-icon>share</v-icon>
                </v-btn>
                <v-btn @click="onDelete" icon>
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <Share :visible="dialog" :title="note.title" :description="note.content" @close="dialog=false"/>
        <v-content>
            <v-container>
                <v-layout column>
                    <v-flex xs12>
                        <v-alert
                            v-if="error"
                            :value="true"
                            type="error">
                            Error saving the note. Please try again.
                        </v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-form ref="form" v-model="valid">
                            <v-text-field required :rules="titleRules" class="display-1 note-title" v-model="note.title" placeholder="Title" />
                            <div v-if="note.timestamp" class="subtitle">{{getTimestampFormatted(note.timestamp.toDate())}}</div>
                            <v-textarea solo auto-grow required :rules="contentRules" class="subheading" v-model="note.content" placeholder="Content" />
                        </v-form>
                    </v-flex>
                    <v-flex xs12 v-if="note.links">
                        <v-card class="main-tiles white--text note-links" color="#34BBDE">
                            <v-card-text>
                                <div class="subheading font-weight-bold mb-1">Interesting Reads</div>
                                <div v-for="(link, index) in note.links" :key="index" class="pl-1">
                                    <a :href="link.url" class="linkText">
                                    <v-layout row>
                                        <v-flex xs11>
                                            <span>{{link.name}}</span>
                                        </v-flex>
                                        <v-flex xs1>
                                            <v-icon color="white">keyboard_arrow_right</v-icon>
                                        </v-flex>
                                    </v-layout>
                                    </a>
                                </div>
                            </v-card-text>
                        </v-card>
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
        }
    },
    data () {
        return {
            dialog: false,
            links: [],
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
    firestore () {
        return {
            note: firestore.collection('users').doc(this.$userId).collection('activities').doc(this.noteId)
        }
    },
    methods: {
        onShare: function () {
            this.dialog = false
        },
        onDelete: async function () {
            try {
                this.error = false
                if (this.noteId !== 'newnote') {
                    await this.$firestore.note.delete()
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
                    if (this.noteId === 'newnote') {
                        await firestore.collection('users').doc(this.$userId).collection('activities').add({
                            content: this.note.content,
                            title: this.note.title,
                            timestamp: new Date(),
                            type: 'note'
                        })
                    } else {
                        await this.$firestore.note.update({
                            content: this.note.content,
                            title: this.note.title,
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


<style scoped>
.linkText {
    color: white; /*#9D9EA1;*/
    text-decoration: none;
}

.main-tiles {
    border-radius: 10px;
}

.note-title {
    font-weight: 900;
    margin-bottom: 2rem;
}

.note-links {
    margin-top: 6rem;
}
</style>