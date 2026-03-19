<template>
    <div id="step">
        <fieldset class="uk-fieldset">
            <legend class="uk-legend" :class="tab.type === 'end' ? 'uk-text-center tm-position-center' : ''">
                {{ tab.name }}
            </legend>
            <div class="uk-margin " v-if="tab.type === 'select'">
                <select
                    v-if="element"
                    v-model="selectedValue"
                    :key="element.id"
                    :disabled="disabled"
                    class="uk-select uk-width-2-3"
                    tabindex="1"
                    id="element-selector"
                    name="elementSelector"
                    autocomplete="off"
                    @change="sendValue($event)"
                    @keyup.enter="selectValue($event)"
                >
                    <option value="-1">Выберите значение...</option>
                    <option v-for="(el, index) in element" :value="index" :key="`options-${index}`">
                        {{ el.name }}
                    </option>
                </select>
            </div>
            <div class="uk-margin" v-if="tab.type === 'radio'">
                <div class="uk-form-controls">
                    <span @change="sendValue($event)" v-for="(el, index) in element" :key="`radio-${index}`">
                        <label>
                            <input
                                v-model="selectedValue"
                                :value="index"
                                :id="`radio-${index}`"
                                :disabled="disabled"
                                class="uk-radio"
                                type="radio"
                                name="radio1"
                            />
                            {{ el.name }}
                        </label>
                        <br v-if="index < element.length" />
                    </span>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'StepGo',
    props: {
        tab: Object,
        element: Array,
        disabled: {
            type: Boolean,
            default: true
        }
    },
    data: () => ({
        elSelected: null
    }),

    computed: {
        selectedValue: {
            get: function() {
                return this.tab.value || -1
            },

            set(value) {
                return value
            }
        }
    },

    methods: {
        sendValue(event) {
            let el = event.target
            el.blur()
            this.$emit('picked', el.value)
        },
        // How Fix FF Selector Logic ?
        selectValue(event) {
            let el = event.target
            el.blur()
            // this.$emit('picked', el.value)
        }
    }
}
</script>

<style scoped>
.tm-radio {
    margin-left: 10px;
    cursor: pointer;
}
.tm-position-center {
    padding-top: 48px;
}
</style>
