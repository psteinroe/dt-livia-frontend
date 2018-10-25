<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="$router.go(-1)" icon>
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-toolbar-title class="subheading">Home</v-toolbar-title>
        </v-toolbar>
        <v-btn
            fixed
            dark
            fab
            bottom
            right
            color="red"
            @click="onAdd">
                <v-icon>add</v-icon>
            </v-btn>
        <v-content>
            <v-container fluid>
                <v-layout column>
                    <v-flex xs12>
                        <div class="headline font-weight-bold">Notes</div>
                    </v-flex>
                    <v-flex xs12>
                        <v-list two-line>
                            <template v-for="(item, index) in notesDisplay">
                                <v-divider
                                v-if="item.divider"
                                :inset="false"
                                :key="index"/>
                                <v-list-tile
                                v-else
                                :key="item._id"
                                @click="onNoteClicked(item)">
                                    <v-list-tile-content>
                                        <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
                                        <v-list-tile-sub-title class="caption"><span class="text--primary">{{getTimestampFormatted(item.timestamp.toDate())}}</span> - {{ item.content }}</v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import {firestore} from '../../services'
import formatter from '../../mixins/formatter'
export default {
    name: 'Notes',
    mixins: [formatter],
    data () {
        return {
            loading: false,
            notes: [],
            error: null
        }
    },
    firestore () {
        return {
            notes: firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'note').orderBy('timestamp', 'desc')
        }
    },
    computed: {
        notesDisplay: function () {
            const aNotesToDisplay = this.notes.reduce((prev, curr, index, array) => {
                if (index !== 0 && index !== array.length) prev.push({divider: true})
                prev.push(curr)
                return prev
            }, [])
            return aNotesToDisplay
        }
    },
    methods: {
        async onNoteClicked (note) {
            this.$router.push({
                name: 'note',
                params: {
                    noteId: note['.key']
                }
            })
        },
        onAdd () {
            this.$router.push({
                name: 'note',
                params: {
                    noteId: 'newnote'
                }
            })
        }
    }
}
</script>

<style>

</style>