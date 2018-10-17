// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
const root = new Vue({
    router,
    render: h => h(App)
})

document.addEventListener('DOMContentLoaded', () => {
    root.$mount('#app')
})
