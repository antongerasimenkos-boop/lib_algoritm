export const filters = {
    namespaced: true,
    state: {
        filters: [],
        filtersAccumulator: []
    },
    actions: {
        setAllFilters({ commit }, all) {
            commit('setAllFilters', all)
        },
        resetAllFilters({ commit }) {
            commit('resetAllFilters')
        },
        setFiltersAccumulator({ commit }, all) {
            commit('setFiltersAccumulator', all)
        },
        resetFiltersAccumulator({ commit }) {
            commit('resetFiltersAccumulator')
        }
    },
    mutations: {
        setAllFilters(state, all) {
            state.filters = all
        },
        resetAllFilters(state) {
            state.filters = []
        },
        setFiltersAccumulator(state, all) {
            state.filtersAccumulator = all
        },
        resetFiltersAccumulator(state) {
            state.filtersAccumulator = []
        }
    },
    getters: {
        filters: s => s.filters || [],
        filtersAccumulator: s => s.filtersAccumulator || []
    }
}
