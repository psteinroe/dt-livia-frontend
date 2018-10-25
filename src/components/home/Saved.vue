<template>
    <v-app>
        <v-toolbar app>
            <v-btn @click="onBack" icon>
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <div class="headline font-weight-bold">Institutions</div>
                    </v-flex>

                    <v-flex
                    v-for="(item) in savedInstitutions"
                    xs12
                    :key="item['.key']">
                    <v-card>
                        <v-card-title class="subheading">{{item.title}}</v-card-title>
                        <v-card-text class="caption">{{item.content}}</v-card-text>
                      
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="articleSavePress(item)" icon>
                            <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn :href="item.url" icon>
                            <v-icon>link</v-icon>
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import {firestore} from '../../services'
export default {
    name: 'Saved',
    firestore () {
        return {
            savedInstitutions: firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'article')
        }
    },
    computed: {
        institutionsDisplay: function () {
            const aInstitutionsToDisplay = this.institutions.reduce((prev, curr, index, array) => {
                if (index !== 0 && index !== array.length) prev.push({divider: true})
                prev.push(curr)
                return prev
            }, [])
            return aInstitutionsToDisplay
        }
    },
    methods: {
        onBack: async function () {
            this.$router.go(-1)
        },
        articleSavePress: async function (article) {
            await firestore.collection('users').doc(this.$userId).collection('activities').doc(article['.key']).delete()
        }
    }
}
</script>


<style>

</style>