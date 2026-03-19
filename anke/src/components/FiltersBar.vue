<template>
    <div id="filters-bar" class="tm-filter">
        <div class="uk-flex uk-flex-between">
            <div class="uk-text-left">
                <h3 class="uk-h3">Фильтры</h3>
            </div>
            <div class="tm-filter-reset uk-text-right uk-text-middle">
                <span
                    @click="reset"
                    class="uk-icon-link"
                    uk-tooltip="title: Очистить фильтры; delay: 500; pos: right-top"
                >
                    <span uk-icon="icon: trash"></span>
                </span>
            </div>
        </div>
        <div class="uk-text-center uk-text-small">
            <SearchLine :icon="false" @search="getFilter"> Поиск по фильтрам </SearchLine>
        </div>

        <div class="uk-margin-top">
            <ul uk-accordion="multiple: true" v-if="steps && fieldsIsReady">
                <!-- ="multiple: true"  v-if="step.type != 'end'" -->
                <li class="uk-open" v-for="(step, index) in cutSteps(steps)" :key="`step-${index}`">
                    <div class="uk-accordion-title uk-text-small">{{ step.name }}</div>
                    <div class="uk-accordion-content">
                        <perfect-scrollbar
                            :options="{
                                suppressScrollY: !(!isMaxFilterItemsInRow(index) && isShowAllItems[index] != undefined)
                            }"
                            :style="`height: ${isMaxFilterItemsInRow(index) ? '100%;' : '220px;'}`"
                            :watchOptions="true"
                        >
                            <div
                                class="tm-filter-items uk-text-small"
                                v-for="(field, indexField) in fieldsOfStep(index)"
                                :key="`field-${indexField}`"
                            >
                                <label
                                    class="tm-input-label"
                                    :class="{
                                        'uk-text-muted': disabled || !getFilterAccumulator(field)
                                    }"
                                    ><input
                                        class="uk-checkbox"
                                        type="checkbox"
                                        :id="`fcheck-${field.data}`"
                                        v-model="newFilters"
                                        :disabled="isFilterItemDisabled(field)"
                                        :value="fields.findIndex(val => val.data === field.data)"
                                    />
                                    {{ field.name }}

                                    <sup class="tm-item-counter" v-if="getFilterAccumulator(field)">
                                        {{ getFilterAccumulator(field) }}
                                    </sup>
                                </label>
                            </div>
                        </perfect-scrollbar>
                        <div class="tm-filter-showall" v-if="isShowAllItems[index] === undefined">
                            <button
                                class="uk-button uk-button-text"
                                v-if="!isMaxFilterItemsInRow(index)"
                                @click="setShowAllItems(index)"
                            >
                                Показать все >
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// Using package
// https://www.npmjs.com/package/vue2-perfect-scrollbar

import SearchLine from '@/components/SearchLine.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'FitersBar',

    components: {
        SearchLine
    },

    props: {
        steps: {
            type: Object,
            default: function() {
                return {}
            }
        },
        fields: {
            type: Array,
            default: function() {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false,
            require: false
        }
    },

    data() {
        return {
            fieldsIsReady: false,
            search: '',
            maxFilterItemsInRow: 9,
            isShowAllItems: {}
        }
    },

    computed: {
        ...mapGetters('filters', ['filters', 'filtersAccumulator']),

        newFilters: {
            get() {
                return this.filters
            },

            set(value) {
                this.setAllFilters(value)
                // Send event with false = just say to "value change"
                this.$emit('onResetFilters', false)

                return value
            }
        },

        newFields() {
            // + Search Filter
            return this.fields.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
        }
    },

    mounted() {
        this.fieldsIsReady = true
    },

    methods: {
        ...mapActions('filters', ['setAllFilters', 'resetAllFilters']),

        getFilter(val) {
            this.search = val
        },

        reset() {
            // send FALSE - no need reset in Up Componet (reset filters here)
            this.$emit('onResetFilters', false)
            this.resetAllFilters()
        },

        fieldsOfStep(index) {
            return this.newFields.filter(val => val.level === parseInt(index))
        },

        cutSteps(steps) {
            let len = Object.keys(steps).length
            let new_steps = { ...steps }
            delete new_steps[len - 1]
            // console.log('steps: ', new_steps)
            return new_steps
        },

        isMaxFilterItemsInRow(index) {
            // if true - ps not scrolling
            return this.fieldsOfStep(index).length < this.maxFilterItemsInRow
        },

        setShowAllItems(index) {
            this.$set(this.isShowAllItems, index, true)
        },

        // для обеспечения не блокировки уже выбранных фильтров (checked)
        isFilterChecked(data) {
            if (this.newFilters.length) {
                let indx = this.fields.findIndex(val => val.data === data)
                if (indx != undefined) {
                    return this.newFilters.findIndex(value => value === indx) != -1 ? true : false
                }
            }
            return false
        },
        isFilterItemDisabled(field) {
            return this.disabled || (!this.getFilterAccumulator(field) && !this.isFilterChecked(field.data))
        },
        getFilterAccumulator(field) {
            return this.filtersAccumulator[this.fields.findIndex(val => val.data === field.data)]
        }
    }
}
</script>

<style scoped>
.tm-filter {
    /* background: #f5f5f6; */
    display: flex;
}

.tm-filter-reset {
    margin-top: 4px;
    cursor: pointer;
}

.ps {
    height: 100%;
}

.tm-filter-items {
    margin-bottom: 4px;
}

.uk-text-muted {
    color: #bbb !important;
}

.tm-filter-showall .uk-button {
    text-transform: none;
    font-size: 12px;
    color: #1e87f0;
}

.tm-item-counter {
    font-size: 10px;
    /* position: absolute; */
    bottom: 2px;
    margin-left: 2px;
}

.tm-input-label {
    cursor: pointer;
}

.uk-accordion-title {
    cursor: pointer;
}

.tm-filter .uk-h3 {
    margin: 0;
}
</style>
