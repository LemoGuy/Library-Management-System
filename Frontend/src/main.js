import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import App from './App.vue'
import Dashboard from './pages/Dashboard.vue'
import Login from './pages/Login.vue'
import CreateUser from '@/pages/users/Create.vue'
import SearchUser from './pages/users/Search.vue'
import CreateBook from './pages/books/Create.vue'
import SearchBook from './pages/books/Search.vue'
import MyBook from './pages/books/MyBooks.vue'
import ForgetPassword from './pages/ForgetPassword.vue'


import { Quasar, Notify } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import { token, setToken } from './services/token'

const routes = [
    {
        path: '/', component: Dashboard,
        meta: { authRequired: true }

    },
    { path: '/login', component: Login },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { authRequired: true }
    },
    {
        path: '/users/create',
        component: CreateUser,
        meta: { authRequired: true }
    },
    {
        path: '/users/search',
        component: SearchUser,
        meta: { authRequired: true }
    },
    {
        path: '/books',
        component: Dashboard,
        meta: { authRequired: true }
    },
    {
        path: '/books/create',
        component: CreateBook,
        meta: { authRequired: true }
    },
    {
        path: '/books/search',
        component: SearchBook,
        meta: { authRequired: true }
    },
    {
        path: '/books/my_books',
        component: MyBook,
        meta: { authRequired: true }
    },
    {
        path: '/forget_password',
        component: ForgetPassword,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})
router.beforeEach((to, from) => {
    if (to.meta.authRequired && !token.value) {
        return "/login";
    }
    return true
})

const app = createApp(App)

app.use(router)
app.use(Quasar, {
    plugins: {
        Notify
    }, // import Quasar plugins and add here
})

app.mount('#app')
