import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Мастер',
        component: Home
    },
    {
        path: '/favorites',
        name: 'Избранное',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue')
    },
    { path: '*', redirect: '/404' }
]

const router = new VueRouter({
    mode: 'history',
    base: '/anketa/',
    routes
})

export default router
