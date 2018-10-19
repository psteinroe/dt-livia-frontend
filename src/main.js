// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueFirestore from 'vue-firestore'
import {auth} from './services'

Vue.use(VueFirestore)
Vue.use(Vuetify)

Vue.config.productionTip = false

let root

auth.onAuthStateChanged(user => {
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
