// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueFirestore from 'vue-firestore'
import {auth, firestore} from './services'
import SocialSharing from 'vue-social-sharing'
import AsyncComputed from 'vue-async-computed'
import './assets/stylus/main.styl'

Vue.use(AsyncComputed)
Vue.use(SocialSharing)
Vue.use(VueFirestore)
Vue.use(Vuetify, {
    iconfont: 'fa'
})

Vue.config.productionTip = false

let root

auth.onAuthStateChanged(async user => {
    // The following is not best practice. Normally you should deploy a serverless function for this!
    async function createDocIfNotExists () {
        if (user) {
            // User found... get document
            // Check if there is a document for me. If not, create it.
            const userRef = firestore.collection('users').doc(user.uid)
            try {
                await userRef.get()
            } catch (err) {
                console.warn(err.message)
                const oUser = user.toJSON()
                const oRelevantUserData = {
                    email: oUser.email
                }
                await userRef.set(oRelevantUserData)
            }
        } else {
            console.log('No user found...')
            router.push('/login')
        }
    }
    createDocIfNotExists()

    if (user) {
        // Make my user id globally available
        Vue.prototype.$userId = user.uid
    }

    if (!root) {
        /* eslint-disable no-new */
        root = new Vue({
            el: '#app',
            template: '<App/>',
            components: {App},
            router
        })
    }
})
