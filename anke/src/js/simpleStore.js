export const simpleStore = {
    state: {
        currentBD: {},
        label: null
    },

    setCurrentBD(newValue) {
        this.state.currentBD = newValue
    },

    setLabel(newValue) {
        this.state.label = newValue
    },

    getLabel() {
        return this.state.label
    }
}
