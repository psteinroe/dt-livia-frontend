<template>
<v-layout column>
    <v-flex xs12>
        <v-layout row wrap>
            <v-flex xs6>
                <router-link to="/notes">
                    <span class="subheading font-weight-bold">Notes</span>
                </router-link>
            </v-flex>
            <v-flex xs6>
                <router-link to="/saved">
                    <span class="subheading font-weight-bold">Saved Articles</span>
                </router-link>
            </v-flex>
            <v-flex xs6>
                <router-link to="/calendar">
                    <span class="subheading font-weight-bold">Calendar</span>
                </router-link>
            </v-flex>
            <v-flex xs6>
                <router-link to="/surprise">
                    <span class="subheading font-weight-bold">Surprise me</span>
                </router-link>
            </v-flex>
        </v-layout>
    </v-flex>
            <v-flex xs12>
                <v-card class="main-tiles" color="#34BBDE">
                    <v-card-text>
                        <div class="subheading font-weight-bold">Your Hospital Stay</div>
                        <ul>
                            <li><span class="font-weight-bold">Diagnose:</span> Coding Syndrome</li>
                            <li><span class="font-weight-bold">Stay Since:</span> 10-10-2018 (4 days)</li>
                            <li><span class="font-weight-bold">Related Articles:</span> 9</li>
                            <li><span class="font-weight-bold">Related Notes:</span> 8</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <v-card class="main-tiles" color="#FF5959">
                    <v-card-text>
                        <div class="subheading font-weight-bold">Next Events</div>
                        <ul>
                            <li><span class="font-weight-bold">Tomorrow, 9am:</span> Daily Doctor Visit</li>
                            <li><span class="font-weight-bold">Thursday, 8am:</span> Blood Test (sober)</li>
                        </ul>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12>
                <v-card class="main-tiles" color="#39967C">
                    <v-card-text>
                        <div class="subheading font-weight-bold">Last Read: LDL-Cholesterol</div>
                        <p>Low-density lipoprotein (LDL) is one of the five major groups of lipoprotein which transport all fat molecules around the body... <span class="font-weight-bold">More</span></p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
</template>

<script>

export default {
    name: 'Home'
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

.main-tiles {
    border-radius: 10px;
    color: white;
}
</style>