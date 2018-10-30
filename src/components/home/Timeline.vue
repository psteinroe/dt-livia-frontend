<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="$router.go(-1)" icon>
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-toolbar-title class="subheading">Home</v-toolbar-title>
            <v-spacer></v-spacer>
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
            <div class="scroll-container">
                <v-container fluid grid-list-xl>
                    <v-layout column>
                        <v-flex xs12>
                            <div class="headline font-weight-bold">Hospital Timeline</div>
                        </v-flex>
                        <v-flex xs12>
                            <v-timeline dense clipped>
                                <v-timeline-item
                                v-for="activity in timelineData"
                                :color="getTimelinePointColor(activity.type)"
                                :key="activity['.key']"
                                @click.native="onTimelineItemClick(activity)"
                                small>
                                <v-layout pt-3>
                                    <v-flex xs4>
                                        <strong>{{getTimestampFormatted(activity.timestamp.toDate())}}</strong>
                                    </v-flex>
                                    <v-flex>
                                        <strong>{{activity.title}}</strong>
                                        <div class="caption">{{activity.content}}</div>
                                    </v-flex>
                                </v-layout>
                                </v-timeline-item>
                            </v-timeline>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
        </v-content>
    </v-app>
</template>

<script>
import {firestore} from '../../services'
import formatter from '../../mixins/formatter'
export default {
    name: 'Timeline',
    mixins: [formatter],
    firestore () {
        return {
            activities: firestore.collection('users').doc(this.$userId).collection('activities').orderBy('timestamp', 'desc')
        }
    },
    methods: {
        onTimelineItemClick: function (activity) {
            switch (activity.type) {
            case 'note':
                this.$router.push({
                    name: 'note',
                    params: {
                        noteId: activity['.key']
                    }
                })
                break
            case 'event':
                // this.$router.push({
                //     name: 'event',
                //     params: {
                //         eventId: activity['.key']
                //     }
                // })
                break
            default:
                break
            }
        },
        getTimelinePointColor: function (type) {
            switch (type) {
            case 'note':
                return 'orange'
            case 'event':
                return 'blue'
            case 'hospital':
                return 'red'
            case 'article':
                return 'white'
            default:
                return 'black'
            }
        },
        onAdd: function () {
            this.$router.push({
                name: 'event',
                params: {
                    eventId: 'newevent'
                }
            })
        }
    },
    computed: {
        timelineData: function () {
            // Join data
            return this.activities
        }
    }
}
</script>


<style>

</style>