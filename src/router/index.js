import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Share from '@/components/Share'
import Home from '@/components/home/Home'
import Main from '@/components/Main'
import Notes from '@/components/home/Notes'
import Note from '@/components/home/Note'
import Surprise from '@/components/home/Surprise'
import Discover from '@/components/discover/Discover'
import Settings from '@/components/settings/Settings'
import Timeline from '@/components/home/Timeline'
import HospitalStay from '@/components/home/HospitalStay'
import Event from '@/components/home/Event'

import { auth } from '../services'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            component: Main,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: Settings,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/discover',
                    name: 'discover',
                    component: Discover,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: Timeline,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/events/:eventId',
            name: 'event',
            component: Event,
            components: { default: Event, share: Share },
            props: { default: true, share: false },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/notes',
            name: 'notes',
            component: Notes,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/notes/:noteId',
            name: 'note',
            components: { default: Note, share: Share },
            props: { default: true, share: false },
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/surprise',
            name: 'surprise',
            component: Surprise,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/hospitalStay/:stayId',
            name: 'hospitalStay',
            components: { default: HospitalStay, share: Share },
            props: { default: true, share: false },
            component: HospitalStay,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const currentUser = auth.currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) next('login')
    else if (!requiresAuth && currentUser) next('/')
    else next()
})

export default router
