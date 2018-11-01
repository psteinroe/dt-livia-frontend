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
        <Share :visible="dialog" :title="event.title" :description="event.content" @close="dialog=false"/>
        <v-content>
            <v-container>
                <v-layout column>
                    <v-flex xs12>
                        <v-alert
                            v-if="error"
                            :value="true"
                            type="error">
                            Error. Please try again.
                        </v-alert>
                    </v-flex>
                    <v-flex xs12>
                        <v-form ref="form" v-model="valid">
                            <v-text-field required :rules="titleRules" class="event-title" v-model="event.title" placeholder="Title" />
                            <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="event.timestamp"
                            persistent
                            lazy
                            full-width>
                                <v-text-field
                                slot="activator"
                                v-model="event.timestamp"
                                label="Date"
                                prepend-icon="event"
                                readonly>
                                </v-text-field>
                                <v-date-picker v-model="event.timestamp" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dialog.save(event.timestamp)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-dialog
                            ref="timeDialog"
                            v-model="timeDialog"
                            :return-value.sync="time"
                            persistent
                            lazy
                            full-width>
                                <v-text-field
                                slot="activator"
                                v-model="time"
                                label="Time"
                                prepend-icon="access_time"
                                readonly />
                                <v-time-picker
                                v-if="timeDialog"
                                v-model="time"
                                full-width>
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                            <v-textarea solo auto-grow required :rules="descriptionRules" class="subheading" v-model="event.content" placeholder="Description" />
                        </v-form>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex align-content-center text-xs-center>
                        <v-btn color="#FF5959" dark v-on:click="onBack">Save</v-btn>
                    </v-flex>
                </v-layout>
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
    name: 'Event',
    components: { Share },
    mixins: [formatter],
    props: {
        eventId: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            modal: false,
            dialog: false,
            timeDialog: false,
            time: null,
            links: [],
            dateRules: [
                v => !!v || 'Date is required'
            ],
            titleRules: [
                v => !!v || 'Title is required'
            ],
            descriptionRules: [
                v => !!v || 'Description is required'
            ],
            error: false,
            valid: false
        }
    },
    firestore () {
        return {
            event: firestore.collection('users').doc(this.$userId).collection('activities').doc(this.eventId)
        }
    },
    methods: {
        onDelete: async function () {
            try {
                this.error = false
                if (this.eventId !== 'newevent') {
                    await this.$firestore.event.delete()
                }
                this.$router.go(-1)
            } catch (err) {
                console.error(err.message)
                this.error = true
            }
        },
        onBack: async function () {
            try {
                await this.saveEvent()
                this.$router.go(-1)
            } catch (err) {
                console.error(err.message)
                this.error = true
            }
        },
        saveEvent: async function () {
            try {
                if (this.$refs.form.validate()) {
                    this.error = false
                    const [hours, minutes] = this.time.split(':')
                    const [year, month, day] = this.event.timestamp.split('-')
                    const oDate = new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes))
                    if (this.eventId === 'newevent') {
                        await firestore.collection('users').doc(this.$userId).collection('activities').add({
                            content: this.event.content,
                            title: this.event.title,
                            timestamp: oDate,
                            type: 'event'
                        })
                    } else {
                        await this.$firestore.event.update({
                            content: this.event.content,
                            title: this.event.title,
                            timestamp: oDate
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
.event-title {
    font-weight: 900;
}
</style>