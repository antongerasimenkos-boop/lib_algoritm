import Vue from 'vue'
import App from './App.vue'
import store from './store'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import PerfectScrollbar from 'vue2-perfect-scrollbar'

import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import router from './router'
import { DEFAULT_MESSAGES as messages } from '@/config/config.js'
import { simpleStore } from '@/js/simpleStore'

const url_string = window.location.href
const url = new URL(url_string)
const label = url.searchParams.get('label')

console.log(label)
simpleStore.setLabel(label)

UIkit.use(Icons)
Vue.use(PerfectScrollbar)

UIkit.icon.add({
    export:
        '<svg id="export" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#000" ><path d="M18 13 L18 18 2 18 2 13 M10 1 L10 15 M4 6.5 L10 1 16 6.5" /></svg>',
    'export-i':
        '<svg id="export-i" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 12 L16 4 24 12" /></svg>',
    import:
        '<svg id="import" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"  fill="none" stroke="#000"><path d="m18 13v5h-16v-5m8-12v14m-6-5.5 6 5.5 6-5.5" stroke-width="1"/></svg>',
    'import-i':
        '<svg id="import-i" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"  fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M28 22 L28 30 4 30 4 22 M16 4 L16 24 M8 16 L16 24 24 16" /></svg>'
})

// Vue.component('AppIcon', () => import('@/components/AppIcon.vue'))

Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

window.document.title = messages.main.title || 'Анкета поиска шаблона'
