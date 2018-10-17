import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/home/Home'
import Notes from '@/components/home/Notes'
import Saved from '@/components/home/Saved'
import Calendar from '@/components/home/Calendar'
import Surprise from '@/components/home/Surprise'
import Discover from '@/components/discover/Discover'
import Settings from '@/components/settings/Settings'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/Login',
            name: 'Login',
            component: Login,
            meta: {
                showBackButton: false,
                title: 'Login'
            }
        },
        {
            path: '/Register',
            name: 'Register',
            component: Register,
            meta: {
                showBackButton: false,
                title: 'Register'
            }
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                showBackButton: false,
                title: 'Livia'
            }
        },
        {
            path: '/Notes',
            name: 'Notes',
            component: Notes,
            meta: {
                showBackButton: true,
                title: 'Your Notes'
            }
        },
        {
            path: '/Saved',
            name: 'Saved',
            component: Saved,
            meta: {
                showBackButton: true,
                title: 'Saved Articles'
            }
        },
        {
            path: '/Calendar',
            name: 'Calendar',
            component: Calendar,
            meta: {
                showBackButton: true,
                title: 'Calendar'
            }
        },
        {
            path: '/Surprise',
            name: 'Surprise',
            component: Surprise,
            meta: {
                showBackButton: true,
                title: 'Surprise, surprise!'
            }
        },
        {
            path: '/Discover',
            name: 'Discover',
            component: Discover,
            meta: {
                showBackButton: false,
                title: 'Discover'
            }
        },
        {
            path: 'Settings',
            name: 'Settings',
            component: Settings,
            meta: {
                showBackButton: false,
                title: 'Settings'
            }
        }
    ]
})
