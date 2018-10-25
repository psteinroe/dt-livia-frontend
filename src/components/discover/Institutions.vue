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
                    v-for="(item) in institutions"
                    xs12
                    :key="item['.key']">
                    <v-card>
                        <v-card-title class="subheading">{{item.name}}</v-card-title>
                        <v-card-text class="caption">{{item.description}}</v-card-text>
                      
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="articleSavePress(item)" icon>
                            <v-icon v-if="isSaved(item.name)">bookmark</v-icon>
                            <v-icon v-else>bookmark_border</v-icon>
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
import formatter from '../../mixins/formatter'
import {firestore} from '../../services'
export default {
    name: 'Institutions',
    mixins: [formatter],
    props: {
        catName: {
            type: String,
            required: true
        }
    },
    firestore () {
        return {
            institutions: firestore.collection('institutions').where('category', '==', this.catName),
            savedInstitutions: firestore.collection('users').doc(this.$userId).collection('activities').where('type', '==', 'article'),
            activities: firestore.collection('users').doc(this.$userId).collection('activities')
        }
    },
    methods: {
        isSaved: function (sName) {
            const oInstitution = this.savedInstitutions.find(oInstitution => {
                return oInstitution.title === sName
            })
            return !(oInstitution === undefined)
        },
        onBack: async function () {
            this.$router.go(-1)
        },
        articleSavePress: async function (article) {
            if (this.isSaved(article.name)) {
                const oActivity = this.savedInstitutions.find(oActivity => {
                    return oActivity.title === article.name
                })
                await firestore.collection('users').doc(this.$userId).collection('activities').doc(oActivity['.key']).delete()
            } else {
                await this.$firestore.activities.add({
                    content: article.description,
                    institutionId: article['.key'],
                    title: article.name,
                    url: article.url,
                    timestamp: new Date(),
                    type: 'article'
                })
            }
        }
    }
}
</script>


<style>

</style>