export const environment = {
    namespaced: true,
    state: {
        environment: {}
    },
    actions: {
        setEnvironment({ commit }, all) {
            commit('setEnvironment', all)
        },
        resetEnvironment({ commit }) {
            commit('resetEnvironment')
        }
    },
    mutations: {
        setEnvironment(state, all) {
            // state.environment = Object.assign(state.environment, all)
            state.environment = all
        },
        resetEnvironment(state) {
            state.environment = {}
        }
    },
    getters: {
        environment: s => s.environment || {}
    }
}
