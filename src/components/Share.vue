<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-btn slot="activator" icon>
            <v-icon>share</v-icon>
        </v-btn>
        <v-card>
            <v-toolbar>
                <v-btn icon @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Share</v-toolbar-title>
            </v-toolbar>
            <social-sharing 
                      :title="this.title"
                      :description="this.description"
                      :quote="this.socialSharing.quote"
                      :hashtags="this.socialSharing.hashtags"
                      :twitter-user="this.socialSharing.twitterUser"
                      inline-template
                      v-cloak
                      network-tag="div">
                <div>
                    <v-container grid-list-xl>
                        <v-layout column>
                            <v-flex xs12>
                                <network network="email" id="email">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/envelope-solid.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">E-Mail</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="facebook" id="facebook">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/facebook-brands.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">Facebook</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="skype" id="skype">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/skype-brands.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">Skype</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="reddit" id="reddit">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/reddit-brands.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">Reddit</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="sms" id="sms">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/comment-solid.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">SMS</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="telegram" id="telegram">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/telegram-brands.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">Telegram</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="twitter" id="twitter">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/twitter-brands.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">Twitter</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                                <v-divider />
                                <network network="whatsapp" id="whatsapp">
                                    <v-layout row align-content-center align-center justify-center>
                                        <v-flex xs2>
                                            <img src="/static/img/share/whatsapp-brands.svg" />
                                        </v-flex>
                                        <v-flex xs10>
                                            <div class="body-2">Whatsapp</div>
                                        </v-flex>
                                    </v-layout>
                                </network>
                            </v-flex>     
                        </v-layout>
                    </v-container>      
                </div>
            </social-sharing>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'Share',

    props: {
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    },
    data () {
        return {
            dialog: false,
            socialSharing: {
                hashtags: 'gettingwell,livia,hospitalcompanion,myfavouriteapp,digitalhealthcare',
                twitterUser: 'livia_health',
                quote: 'I am getting well easily with the help of Livia!'
            }
        }
    }
}
</script>
