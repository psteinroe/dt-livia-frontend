<template>
<v-layout column>
    <v-flex xs12>
        <v-layout row wrap>
            <v-flex xs6>
                <router-link to="/notes">
                    <v-layout row>
                        <v-flex xs6>
                            <span class="subheading font-weight-bold">Notes</span>
                        </v-flex>
                        <v-flex xs6>
                            <div class="counterContainer ccNotes">
                                <p class="counterText">
                                    {{ countNotes }}
                                </p>
                            </div>
                        </v-flex>
                    </v-layout>
                </router-link>
            </v-flex>
            <v-flex xs6>
                <router-link to="/saved">
                    <v-layout row>
                        <v-flex xs9>
                            <span class="subheading font-weight-bold">Saved Articles</span>
                        </v-flex>
                        <v-flex xs3>
                            <div class="counterContainer ccSaved">
                                <p class="counterText">
                                    {{ countSaved }}
                                </p>
                            </div>
                        </v-flex>
                    </v-layout>
                </router-link>
            </v-flex>
            <v-flex xs6>
                <router-link to="/timeline">
                    <v-layout row>
                        <v-flex xs6>
                            <span class="subheading font-weight-bold">Timeline</span>
                        </v-flex>
                        <v-flex xs6>
                            <div class="counterContainer ccTimeline">
                                <p class="counterText">
                                    {{ countTimeline }}
                                </p>
                            </div>
                        </v-flex>
                    </v-layout>
                </router-link>
            </v-flex>
            <v-flex xs6>
                <router-link to="/surprise">
                    <v-layout row>
                        <v-flex xs9>
                            <span class="subheading font-weight-bold">Surprise me</span>
                        </v-flex>
                        <v-flex xs3>
                            <img src="./../../../static/img/home/baseline-healing-24px.svg">
                        </v-flex>
                    </v-layout>
                </router-link>
            </v-flex>
        </v-layout>
    </v-flex>
            <v-flex xs12>
                <v-card @click.native="onHospitalStayClick" class="main-tiles white--text" color="#34BBDE">
                    <v-card-text v-if="this.hospitalStay && this.hospitalStay[0] && this.hospitalStay[0].current">
                        <div class="subheading font-weight-bold">Your Hospital Stay</div>
                        <ul>
                            <li><span class="font-weight-bold">Diagnose:</span> {{this.hospitalStay[0].content}}</li>
                            <li><span class="font-weight-bold">Stay Since:</span> {{getTimestampFormatted(this.hospitalStay[0].timestamp.toDate())}} ({{stayInDays}} Days)</li>
                            <li><span class="font-weight-bold">Related Articles:</span> {{this.hospitalStay[0].relatedArticlesCount}}</li>
                            <li><span class="font-weight-bold">Related Notes:</span> {{this.hospitalStay[0].relatedNotesCount}}</li>
                        </ul>
                    </v-card-text>
                    <v-card-text v-else>
                        <div class="subheading font-weight-bold">Add infos about your hospital stay...</div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <v-card to="/timeline" class="main-tiles white--text" color="#FF5959">
                    <v-card-text v-if="upcomingEvents.length > 0">
                        <div class="subheading font-weight-bold">Next Events</div>
                        <ul>
                            <li v-for="event in upcomingEvents" :key="event._id"><span class="font-weight-bold">{{getDisplayDate(event.timestamp.toDate())}}</span> {{event.title}}</li>
                        </ul>
                    </v-card-text>
                    <v-card-text v-else>
                        <div class="subheading font-weight-bold">No events by now. Start adding appointments in the calendar..</div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 v-if="this.lastRead && this.lastRead[0]">
                <v-card class="main-tiles white--text" color="#39967C" :href="lastRead[0].url">
                    <v-card-text>
                        <div class="subheading font-weight-bold">Last Read: {{lastRead[0].title}}</div>
                        <p>{{lastRead[0].content}}</p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>
import {firestore} from '../../services'
import formatter from '../../mixins/formatter'

export default {
    name: 'Home',
    mixins: [formatter],
    firestore () {
        return {
            user: firestore.collection('users').doc(this.$userId),
            hospitalStay: firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'hospital').orderBy('timestamp', 'desc').limit(1),
            lastRead: firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'article').orderBy('timestamp', 'desc').limit(1),
            upcomingEvents: firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'event').where('timestamp', '>=', new Date()).orderBy('timestamp', 'asc'),
            countNotes: 0,
            countTimeline: 0,
            countSaved: 0
        }
    },
    created: function () {
        // this is not best practice. One should create a firestore function to store the counts
        firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'note').get().then(querySnapshot => {
            this.countNotes = querySnapshot.size
        })
        firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'event').get().then(querySnapshot => {
            this.countTimeline = querySnapshot.size
        })
        firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'article').get().then(querySnapshot => {
            this.countSaved = querySnapshot.size
        })
    },
    computed: {
        lastReadTest () {

        },
        stayInDays () {
            if (this.hospitalStay[0]) {
                const oDate = this.hospitalStay[0].timestamp.toDate()
                const oNow = new Date()
                const fTimeDiff = Math.abs(oDate.getTime() - oNow.getTime())
                const iDiffDays = Math.ceil(fTimeDiff / (1000 * 3600 * 24))
                return iDiffDays
            } else {
                return ''
            }
        }
    },
    methods: {
        onLastReadClick (url) {
            window.open(url)
        },
        onHospitalStayClick () {
            if (!this.hospitalStay[0] || !this.hospitalStay[0].current) {
                this.$router.push({
                    name: 'hospitalStay',
                    params: {
                        stayId: 'newstay'
                    }
                })
            } else {
                this.$router.push({
                    name: 'hospitalStay',
                    params: {
                        stayId: this.hospitalStay[0]['.key']
                    }
                })
            }
        },
        getDisplayDate (oDate) {
            let s = ''

            const oToday = new Date()
            const fTimeDiff = Math.abs(oDate.getTime() - oToday.getTime())
            const iDiffDays = Math.ceil(fTimeDiff / (1000 * 3600 * 24))
            if (iDiffDays === 0) {
                s += 'Today'
            } else if (iDiffDays === 1) {
                s += 'Tomorrow'
            } else {
                const iWeekday = oDate.getDay()
                const aWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                s += aWeekdays[iWeekday]
            }

            s += ', '

            const iHour = oDate.getHours()
            if (iHour <= 12) s += iHour + 'am'
            else s += (iHour - 12) + 'pm'

            s += ':'

            return s
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

.main-tiles {
    border-radius: 10px;
}

.counterContainer {
    width:24px;
    height:24px;
    border-radius:100%;
    line-height: 24px;
    text-align: center;
}

.ccNotes {
    background-color:#34BBDE;
}

.ccTimeline {
    background-color:#FF5959;
}

.ccSaved {
    background-color:#39967C;
}

.counterText {
    color:white;
    font-weight:bold;
}
</style>