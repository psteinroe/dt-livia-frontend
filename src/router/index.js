import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/home/Home'
import Main from '@/components/Main'
import Notes from '@/components/home/Notes'
import NewNote from '@/components/home/NewNote'
import Saved from '@/components/home/Saved'
import Calendar from '@/components/home/Calendar'
import Surprise from '@/components/home/Surprise'
import Discover from '@/components/discover/Discover'
import Settings from '@/components/settings/Settings'

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
                        showBackButton: false,
                        title: 'Livia',
                        requiresAuth: true
                    }
                },
                {
                    path: '/notes',
                    name: 'notes',
                    component: Notes,
                    meta: {
                        showBackButton: true,
                        title: 'Your Notes',
                        requiresAuth: true
                    }
                },
                {
                    path: '/NewNote',
                    name: 'Note',
                    component: NewNote,
                    meta: {
                        showBackButton: true,
                        title: 'New Note'
                    }
                },
                {
                    path: '/saved',
                    name: 'saved',
                    component: Saved,
                    meta: {
                        showBackButton: true,
                        title: 'Saved Articles',
                        requiresAuth: true
                    }
                },
                {
                    path: '/calendar',
                    name: 'calendar',
                    component: Calendar,
                    meta: {
                        showBackButton: true,
                        title: 'Calendar',
                        requiresAuth: true
                    }
                },
                {
                    path: '/surprise',
                    name: 'surprise',
                    component: Surprise,
                    meta: {
                        showBackButton: true,
                        title: 'Surprise, surprise!',
                        requiresAuth: true
                    }
                },
                {
                    path: '/discover',
                    name: 'discover',
                    component: Discover,
                    meta: {
                        showBackButton: false,
                        title: 'Discover',
                        requiresAuth: true
                    }
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: Settings,
                    meta: {
                        showBackButton: false,
                        title: 'Settings',
                        requiresAuth: true
                    }
                }
            ]
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
