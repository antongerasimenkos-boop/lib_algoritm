import Vue from 'vue'
import Vuex from 'vuex'

import { filters } from './filters.module'
import { environment } from './environment.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        filters,
        environment
    }
})

export default store
