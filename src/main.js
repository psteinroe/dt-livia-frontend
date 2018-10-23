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

Vue.use(SocialSharing)
Vue.use(VueFirestore)
Vue.use(Vuetify, {
    iconfont: 'fa'
})

Vue.config.productionTip = false

let root

auth.onAuthStateChanged(async user => {
    async function createDocIfNotExists () {
        // Check if there is a document for me
        const userRef = firestore.collection('users').doc(user.uid)
        try {
            await userRef.get()
        } catch (err) {
            console.warn(err.message)
        } finally {
            const oUser = user.toJSON()
            const oRelevantUserData = {
                email: oUser.email
            }
            await userRef.set(oRelevantUserData)
        }
    }
    createDocIfNotExists()
    // Make my user id globally available
    Vue.prototype.$userId = user.uid
    if (!root) {
        /* eslint-disable no-new */
        root = new Vue({
            el: '#app',
            template: '<App/>',
            components: { App },
            router
        })
    }
})
