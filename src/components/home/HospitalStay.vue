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
            </v-toolbar-items>
        </v-toolbar>
        <Share :visible="dialog" :title="hospitalStay.title" :description="hospitalStay.content" @close="dialog=false"/>
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
                            <v-text-field required :rules="hospitalRules" class="body-2" v-model="hospitalStay.title" placeholder="Hospital" />
                            <div v-if="hospitalStay.timestamp" class="subtitle">Since: {{getTimestampFormatted(hospitalStay.timestamp.toDate())}}</div>
                            <v-text-field required :rules="diagnoseRules" class="body-2" v-model="hospitalStay.content" placeholder="Diagnose" />
                        </v-form>
                    </v-flex>
                    <v-flex xs12 v-if="this.hospitalStay.current">
                        <v-layout align-center justify-center row fill-height>
                            <v-btn @click="onLeave">Leave Hospital</v-btn>
                        </v-layout>
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
    name: 'HospitalStay',
    components: { Share },
    props: {
        stayId: {
            type: String,
            required: true
        }
    },
    mixins: [formatter],
    data () {
        return {
            user: {},
            dialog: false,
            diagnoseRules: [
                v => !!v || 'Diagnose is required'
            ],
            hospitalRules: [
                v => !!v || 'Hospital is required'
            ],
            error: false,
            valid: false
        }
    },
    firestore () {
        return {
            hospitalStay: firestore.collection('users').doc(this.$userId).collection('activities').doc(this.stayId)
        }
    },
    methods: {
        onLeave: async function () {
            try {
                this.error = false
                await this.$firestore.hospitalStay.update({
                    current: false,
                    left: new Date()
                })
                this.$router.go(-1)
            } catch (err) {
                console.error(err.message)
                this.error = true
            }
        },
        onBack: async function () {
            await this.save()
            this.$router.go(-1)
        },
        save: async function () {
            try {
                if (this.$refs.form.validate()) {
                    this.error = false
                    if (this.stayId === 'newstay') {
                        await firestore.collection('users').doc(this.$userId).collection('activities').add({
                            content: this.hospitalStay.content,
                            title: this.hospitalStay.title,
                            timestamp: new Date(),
                            current: true,
                            type: 'hospital',
                            relatedArticlesCount: 0,
                            relatedNotesCount: 0
                        })
                    } else {
                        await this.$firestore.hospitalStay.update({
                            content: this.hospitalStay.content,
                            title: this.hospitalStay.title
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