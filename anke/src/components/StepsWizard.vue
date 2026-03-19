<template>
    <div id="stepper">
        <template v-if="!isDataFromApiLoaded">
            <div class="uk-align-center uk-position-center uk-text-center">
                <span uk-spinner="ratio: 2" v-show="!isDataFromApiLoaded && !attempt"></span>
                <p class="uk-text-muted uk-text-small">{{ attemptMsg }}</p>
            </div>
        </template>
        <div class="tm-main uk-section uk-section-default" v-if="isDataFromApiLoaded && fieldsIsReady">
            <div class="uk-container uk-container-large uk-position-relative">
                <div class="uk-align-center" :class="hideMobileMenu ? 'uk-margin-left' : 'uk-margin-small-left'">
                    <h3 id="filter" :class="hideMobileMenu ? 'uk-h3' : 'uk-h5'" class="tm-heading-fragment">
                        <ul class="uk-list">
                            <li>
                                <a
                                    class="uk-text-break toggle-content tm-heading-fragment uk-text-warning"
                                    :class="hideMobileMenu ? 'uk-margin-left' : 'uk-margin-small-left'"
                                    href="#toggle-content"
                                    uk-toggle="target: .toggle-content; animation: uk-animation-fade"
                                    >{{ messages.wizard.anketaClose }}<span uk-icon="icon: chevron-down"></span>
                                </a>
                                <a
                                    class="uk-text-break toggle-content tm-heading-fragment uk-text-primary"
                                    :class="hideMobileMenu ? 'uk-margin-left' : 'uk-margin-small-left'"
                                    href="#toggle-content"
                                    uk-toggle="target: .toggle-content; animation: uk-animation-fade"
                                    hidden
                                    >{{ messages.wizard.anketaOpen }}<span uk-icon="icon: chevron-up"></span>
                                </a>
                            </li>
                        </ul>
                    </h3>
                    <!-- <h4 class="uk-text-normal">Фильтр позволяет выбрать интересующий Вас шаблон.</h4> -->
                </div>

                <!-- Мастер Вопросник -->
                <div id="toggle-content" class="toggle-content">
                    <div class="vue-step-wizard uk-child-width-expand@s" uk-grid>
                        <div class="tm-step uk-width-3-5">
                            <div class="uk-card uk-card-hover">
                                <div class="tm-step-card-header uk-card-header">
                                    <div class="step-pills" v-if="tabs">
                                        <span
                                            @click.prevent.stop="selectTab(index)"
                                            class="step-header-item"
                                            v-for="(tab, index) in tabs"
                                            v-bind:key="`tab-${index}`"
                                        >
                                            <template
                                                v-if="
                                                    (index + 1 != totalTabs &&
                                                        index - currentTab < 2 &&
                                                        !(nextStepIsEnd && prevTab < index) &&
                                                        !(nextStepIsLastStep && index > currentTab)) ||
                                                        tab.isValidated
                                                "
                                            >
                                                <span
                                                    class="step-item"
                                                    :class="{
                                                        active: tab.isActive,
                                                        validated: tab.isValidated
                                                    }"
                                                >
                                                    <span class="tab-status" v-if="!tab.isValidated">
                                                        {{ index + 1 }}
                                                    </span>
                                                    <span class="tab-status" uk-icon="icon: check" v-else> </span>
                                                    <template v-if="hideMobileMenu && isStepPillsAnswerMode">
                                                        <span class="tab-label" v-if="tab.isValidated">
                                                            {{ tab.title }} {{ index + 1 }}
                                                        </span>
                                                        <span class="tab-label" v-else>{{ tab.title }}</span>
                                                    </template>
                                                    <span
                                                        v-if="hideMobileMenu && isStepPillsAnswerMode"
                                                        class="tab-answer uk-text-center uk-text-break"
                                                    >
                                                        <div class="tm-text-small uk-text-muted">
                                                            {{ tab.value && tab.name + ':' }}
                                                        </div>
                                                        <div class="uk-text-small uk-text-bold">
                                                            {{ tab.value && tab.answer.name }}
                                                        </div></span
                                                    >
                                                </span>

                                                <hr
                                                    role="separator"
                                                    aria-orientation="horizontal"
                                                    class="uk-text-left v-divider"
                                                    v-if="isDrawSeparator(index)"
                                                />
                                            </template>
                                        </span>
                                    </div>
                                </div>

                                <!-- Анимация сдвига и Тело опросника -->
                                <transition :name="nameOfAnimation">
                                    <div
                                        v-if="tabs[currentTab]"
                                        :key="tabs[currentTab].name"
                                        class="tm-card-body uk-card-body"
                                        mode="out-in"
                                    >
                                        <StepGo
                                            :tab="tabs[currentTab]"
                                            :element="vids"
                                            :disabled="!loadedTemplates"
                                            @picked="getPicker"
                                        />
                                    </div>
                                </transition>

                                <div class="uk-card-footer">
                                    <div class="btn-group" :class="{ 'uk-flex uk-flex-between': rego }" role="group">
                                        <div class="uk-text-left" role="group">
                                            <template>
                                                <!--v-if="!submitSuccess">-->
                                                <button
                                                    :disabled="currentTab === 0"
                                                    class="uk-button uk-button-default"
                                                    :class="
                                                        hideMobileMenu ? 'uk-margin-right' : 'uk-margin-small-right'
                                                    "
                                                    uk-tooltip="title: Назад; delay: 500; pos: left"
                                                    @click="previousTab"
                                                >
                                                    <span uk-icon="icon: chevron-left"></span>
                                                </button>
                                                <button
                                                    v-if="
                                                        currentTab < totalTabs - 2 &&
                                                            !nextStepIsLastStep &&
                                                            !nextStepIsEnd
                                                    "
                                                    :disabled="!nextStepEnabled"
                                                    class="uk-button uk-button-primary"
                                                    id="next-button"
                                                    uk-tooltip="title: Дальше; delay: 500; pos: right"
                                                    @click="nextTab"
                                                >
                                                    <span uk-icon="icon: chevron-right"></span>
                                                </button>
                                                <button
                                                    :disabled="!nextStepEnabled"
                                                    v-if="currentTab + 2 === totalTabs || nextStepIsLastStep"
                                                    class="uk-button uk-button-primary"
                                                    id="next-button"
                                                    uk-tooltip="title: Завершить; delay: 500; pos: right"
                                                    @click="rego = true"
                                                >
                                                    <span uk-icon="icon: check"></span>
                                                </button>
                                                <button
                                                    v-if="currentTab + 1 === totalTabs || nextStepIsEnd"
                                                    class="uk-button uk-button-danger"
                                                    :class="
                                                        hideMobileMenu ? 'uk-margin-right' : 'uk-margin-small-right'
                                                    "
                                                    href="#toggle-content"
                                                    uk-toggle="target: .toggle-content; animation: uk-animation-fade"
                                                    id="submit-button"
                                                    uk-tooltip="title: Применить фильтр и свернуть; delay: 500; pos: right"
                                                    @click="submitMasterFilters()"
                                                >
                                                    <span uk-icon="icon: check"></span>
                                                </button>
                                            </template>
                                        </div>
                                        <div class="uk-text-right" v-if="rego">
                                            <button
                                                class="uk-button uk-button-default"
                                                :class="hideMobileMenu ? 'uk-margin-right' : ''"
                                                uk-tooltip="title: Сбросить фильтр и запустить мастер; delay: 500; pos: left"
                                                @click="reset"
                                            >
                                                <span uk-icon="icon: trash"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tm-filter-info uk-width-1-5 uk-visible@l" v-if="!isStepPillsAnswerMode">
                            <div class="uk-card uk-card-small uk-card-hover">
                                <div class="uk-card-body">
                                    <div class="uk-text-normal">Выбранные фильтры:</div>
                                    <ul class="uk-list uk-list uk-text-small" v-if="tabs">
                                        <li v-for="(tab, index) in tabs" :key="`filter-${index}`">
                                            <div class="uk-text-left uk-text-muted" v-if="tab.value">
                                                {{ tab.name }}:
                                            </div>
                                            <div class="">{{ tab.value && tab.answer.name }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Таблица результатов - список шаблонов и Фильтр -->
                <div class="uk-margin">
                    <div uk-grid>
                        <div :class="tablePanelClass">
                            <div class="tm-table uk-card uk-card-default">
                                <template v-if="fieldsIsReady">
                                    <TemplatesTable
                                        :fields="fields"
                                        :steps="steps"
                                        :isMobiledView="!hideMobileMenu"
                                        @onLoaded="templatesLoaded"
                                    />
                                </template>
                            </div>
                        </div>
                        <div class="tm-fl-test uk-width-1-4 uk-visible@l" v-if="SHOW_FILTER_PANEL">
                            <div class="tm-filter uk-card uk-card-default uk-card-small uk-card-body">
                                <template v-if="fieldsIsReady">
                                    <FiltersBar
                                        :steps="steps"
                                        :fields="fields"
                                        :disabled="DISABLE_FILTER_PANEL"
                                        @onResetFilters="reset"
                                    />
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Offcanvas -->
        <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true" v-if="SHOW_FILTER_PANEL">
            <div class="uk-offcanvas-bar">
                <button class="uk-offcanvas-close" type="button" uk-close></button>
                <div class="uk-margin-top">
                    <div class="uk-card uk-card-small uk-card-body">
                        <template v-if="fieldsIsReady">
                            <FiltersBar
                                :steps="steps"
                                :fields="fields"
                                :disabled="DISABLE_FILTER_PANEL"
                                @onResetFilters="reset"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UIkit from 'uikit'

import { DEFAULT_METHOD_FAST, DEFAULT_MODE_TYPE, SHOW_FILTER_PANEL, DISABLE_FILTER_PANEL } from '@/config/config'
import StepGo from '@/components/StepGo.vue'
import TemplatesTable from '@/components/TemplatesTable.vue'
import FiltersBar from '@/components/FiltersBar.vue'
import { simpleStore } from '@/js/simpleStore'
import { getFieldsAndNodes } from '@/js/getFieldsAndNodes'
import { mapActions, mapGetters } from 'vuex'
import { DEFAULT_MESSAGES as configMessages } from '@/config/config.js'

export default {
    name: 'StepsWizard',

    components: {
        StepGo,
        TemplatesTable,
        FiltersBar
    },

    data: () => ({
        step: null,
        steps: {},
        tabs: [],
        vids: [],
        fields: [],
        node: [],
        filter: [],
        rego: false,
        currentTab: 0,
        prevTab: 0,
        totalTabs: 0,
        pickerVal: '-1',
        nameOfAnimation: 'anim-current',
        isValidationSupport: true,
        nextStepEnabled: false,
        nextStepIsEnd: false,
        nextStepIsLastStep: false,
        fieldsIsReady: false,
        hideMobileMenu: true,
        isStepPillsAnswerMode: true,
        isDataFromApiLoaded: false,
        attempt: false,
        attemptMsg: '',
        messages: '',
        SHOW_FILTER_PANEL,
        DISABLE_FILTER_PANEL,
        loadedTemplates: false

        // nextStepIsStop: false
    }),
    computed: {
        ...mapGetters('filters', ['filters', 'filtersAccumulator']),
        ...mapGetters('environment', ['environment']),
        tablePanelClass() {
            if (!SHOW_FILTER_PANEL) {
                return 'uk-width-4-4'
            } else return this.hideMobileMenu ? 'uk-width-3-4@l' : 'uk-width-3-5@m'
        }
    },

    watch: {
        environment(newVal) {
            this.hideMobileMenu = newVal.hideMobileMenu
        }
    },

    async mounted() {
        this.messages = configMessages
        let bd = false
        this.isDataFromApiLoaded = false
        this.fieldsIsReady = false
        let counter = 0
        this.attempt = false
        this.attemptMsg = ''
        this.loadedTemplates = false

        while (bd === false) {
            await getFieldsAndNodes().then(data => {
                bd = data
            })
            if (bd) break
            counter++
            this.attemptMsg = 'Попытка повторного соединения: ' + counter

            if (counter > 4) {
                this.attempt = true
                bd = true
                this.attemptMsg = 'Cоединение с сервером не установлено, попробуйте позже.'
            }

            await this.delay(2000)
            // if (this.attempt) this.attemptMsg = ''
        }

        if (this.attempt) return
        this.isDataFromApiLoaded = true

        // Для использования в templates.js
        simpleStore.setCurrentBD(Object.assign({}, bd))

        this.steps = { ...bd.steps }
        this.tabs = Object.entries(bd.steps).map(val => val[1])
        this.totalTabs = Object.keys(bd.steps).length
        this.currentTab = this.tabs.findIndex(tab => tab.isActive === true)
        this.fields = Object.entries(bd.fields).map(val => val[1])
        this.node = Object.entries(bd.node).map(val => val[1])

        // console.log('tabs: ', this.tabs, '\nfields: ', this.fields, '\node: ', this.node)
        this.reset(true)

        //Select first tab if none is marked selected
        if (this.currentTab === -1 && this.totalTabs > 0) {
            this.tabs[0].isActive = true
            this.currentTab = 0
        }

        this.fieldsIsReady = true
        this.hideMobileMenu = this.environment.hideMobileMenu
    },

    methods: {
        ...mapActions('filters', ['setAllFilters', 'resetAllFilters']),

        fillVids(fIndex = 0, previosIndex = -1) {
            let vids = []
            let arr = []
            let values = []

            if (DEFAULT_MODE_TYPE === 'anketa') {
                values = this.node.filter(val => val.level === fIndex)

                if (previosIndex != -1) {
                    values = values.filter(val => val.parent === previosIndex)
                }

                values.forEach(val => {
                    arr = this.fields[val.field]
                    arr.filter = val.field
                    arr.id = val.id
                    vids.push(arr)
                })
            } else {
                values = this.fields.filter((val, index) => {
                    if (+val.level === fIndex) {
                        val.filter = index
                        return val
                    }
                })

                let i = 0
                values.forEach(val => {
                    arr = val
                    arr.id = i
                    i++
                    vids.push(arr)
                })
            }
            arr = []

            return vids.length != 0 ? vids : false
        },

        reset(isReset) {
            this.tabs.forEach(tab => {
                tab.isActive = false
                tab.isValidated = false
                tab.isLastStep = false
                tab.answer = ''
                tab.value = ''
            })

            this.nextStepEnabled = false
            this.nextStepIsEnd = false
            this.nextStepIsLastStep = false
            this.currentTab = 0
            // First step values
            this.vids = this.calculateVids(this.fillVids(0), 0)
            this._switchTab(0)
            this.pickerVal = '-1'
            this.rego = false
            this.filter = []
            isReset && this.resetAllFilters()
            this.nameOfAnimation = 'anim-current'
        },

        resetFrom(id) {
            this.tabs.forEach((tab, index) => {
                if (index > id) {
                    tab.isActive = false
                    tab.isValidated = false
                    tab.isLastStep = false
                    tab.value = ''
                    tab.answer = ''
                }
            })
        },

        templatesLoaded() {
            this.vids = this.calculateVids(this.fillVids(0), 0)
            this.loadedTemplates = true
        },

        previousTab() {
            this.nextStepIsLastStep = false
            if (this.nextStepIsEnd) {
                this.currentTab = this.prevTab + 1
                this.nextStepIsEnd = false
                this.nextStepIsLastStep = true
            }

            this.pickerVal = this.tabs[this.currentTab - 1].value

            let vids, index
            if (this.currentTab - 2 > -1) {
                let answerId = this.tabs[this.currentTab - 2].answer.id

                vids = this.fillVids(this.currentTab - 1, answerId)
                index = this.currentTab - 1
            } else {
                vids = this.fillVids(0)
                index = 0
            }

            this.vids = this.calculateVids(vids, index)

            this._switchTab(this.currentTab - 1)
            this._validateCurrentTab()
            this.nameOfAnimation = 'anim-prev'
            this.$emit('onPreviousStep')
            this.rego = false
        },

        nextTab() {
            if (this._validateCurrentTab() === false) return

            this._setValue(this.pickerVal)

            let isLastStep = this.tabs[this.currentTab].isLastStep
            if (!isLastStep) {
                /* eslint-disable no-debugger */
                // debugger
                let vids = this.fillVids(this.currentTab + 1, this.vids[this.pickerVal].id)

                this.vids = this.calculateVids(vids, this.currentTab + 1)
                if (this.vids.length) {
                    this._switchTab(this.currentTab + 1)
                    this._validateCurrentTab()
                }
            }
            if (isLastStep || this.vids.length === 0) {
                // to end
                this.nextStepIsLastStep = false
                // open last step dialog - end message
                this._switchTab(this.totalTabs - 1)
                this.nextStepIsEnd = true
            }
            this.nameOfAnimation = 'anim-next'
            this.$emit('onNextStep')

            setTimeout(() => {
                let el = document.getElementById('element-selector')
                    ? document.getElementById('element-selector')
                    : document.getElementById('radio-0')
                el && el.focus()
            }, 400)
        },

        selectTab(index) {
            let currentTab = !this.nextStepIsEnd ? this.currentTab : this.prevTab
            if (index === currentTab && !this.nextStepIsEnd) return

            if (index > 0 && this.tabs[index].isValidated === false) {
                return
            }

            this.nextStepIsEnd = false
            this._switchTab(index)
            this.pickerVal = this.tabs[index].value

            let vids
            if (index - 1 > -1) {
                let answerId = this.tabs[index - 1].answer.id
                vids = this.fillVids(index, answerId)
            } else {
                vids = this.fillVids(0)
            }

            this.vids = this.calculateVids(vids, index)
            this._validateCurrentTab()
            this.nameOfAnimation = index <= currentTab ? 'anim-prev' : 'anim-next'
            this.rego = currentTab + 1 === this.totalTabs || this.nextStepIsEnd ? true : false
        },

        _switchTab(index) {
            //Disable all tabs
            this.tabs.forEach(tab => {
                tab.isActive = false
            })
            this.prevTab = this.currentTab
            this.currentTab = index
            this.tabs[index].isActive = true
            this.pickerVal = this.tabs[this.currentTab].value
        },

        _validateCurrentTab() {
            //Check if user wants to validate
            if (!this.isValidationSupport) {
                return true
            }

            if (!this.pickerVal || this.pickerVal === '-1') {
                this.nextStepEnabled = false
                this.nextStepIsLastStep = false
                this.nextStepIsEnd = false
                this.tabs[this.currentTab].isValidated = false
                return false
            }

            this.tabs[this.currentTab].isValidated = true
            this.nextStepEnabled = true
            this.nextStepIsLastStep = this.tabs[this.currentTab].isLastStep

            return true
        },

        _setValue(val) {
            let oldVal = this.tabs[this.currentTab].value

            if (oldVal != val) {
                this.resetFrom(this.currentTab)
            }

            this.tabs[this.currentTab].value = val
            this.tabs[this.currentTab].answer = this.vids[val]
            this.tabs[this.currentTab].isLastStep = !this.fillVids(this.currentTab + 1, this.vids[val].id)

            let tmp = this.tabs[this.currentTab]
            this.$set(this.tabs, this.currentTab, tmp)
        },

        _validateValue(val) {
            if (!val || val === '-1') return false

            return true
        },

        getPicker(val) {
            this.nextStepEnabled = val != '-1' ? true : false
            this.pickerVal = val

            if (this.nextStepEnabled) {
                this.nextStepIsLastStep = !this.fillVids(this.currentTab + 1, this.vids[this.pickerVal].id)
            } else {
                this.tabs[this.currentTab].answer = ''
                this.resetFrom(this.currentTab)
                this.nextStepIsLastStep = false
                this.submitMasterFilters()
            }

            if (this.currentTab != this.totalTabs - 1) {
                setTimeout(() => {
                    let el = document.getElementById('next-button')
                    el && el.focus()
                    el && UIkit.tooltip(el).hide()
                }, 0)
            } else {
                setTimeout(() => {
                    let el = document.getElementById('submit-button')
                    el && el.focus()
                    el && UIkit.tooltip(el).hide()
                }, 0)
            }
            if (DEFAULT_METHOD_FAST) {
                this.nextTab()
                this.rego = this.currentTab + 1 === this.totalTabs || this.nextStepIsLastStep ? true : false
                this.submitMasterFilters()
            }
        },

        submitMasterFilters() {
            this.filter = []
            this.tabs.forEach(tab => {
                if (tab.answer.data) this.filter.push(tab.answer.filter)
            })
            this.setAllFilters(this.filter)
            // console.log('Filter: ', ...this.filter)
        },

        calculateVids(vids, level) {
            if (vids && vids.length) {
                // все значения в рамках одного уровня
                let templates
                if (
                    simpleStore.state.currentBD &&
                    simpleStore.state.currentBD.templates &&
                    Object.keys(simpleStore.state.currentBD.templates).length
                ) {
                    templates = Object.entries(simpleStore.state.currentBD.templates).map(val => val[1])
                    // let tmpFilter = this.filter.slice()
                    let tmpFilter = []
                    this.tabs.forEach(tab => {
                        if (tab.answer.data) tmpFilter.push(tab.answer.filter)
                    })
                    let testFilter = level > 0 ? tmpFilter.slice(0, level) : [] // tmpFilter

                    let collection = []
                    vids.forEach((item, indx) => {
                        testFilter.push(item.filter)
                        if (
                            templates.findIndex(val =>
                                testFilter.every(el => {
                                    let dip = val.filter[this.fields[el].level]
                                    if (dip != undefined) {
                                        return Array.isArray(dip) ? dip.flat().includes(el) : el === dip
                                    } else return false
                                })
                            ) != -1
                        ) {
                            // console.log('Find ', indx)
                            collection.push(vids[indx])
                        }
                        testFilter.pop()
                    })
                    testFilter = []
                    tmpFilter = []
                    vids = collection.slice()
                    collection = []
                    return vids
                } else return vids
            }
            return false
        },

        delay(ms) {
            return new Promise(resolve => {
                setTimeout(resolve, ms)
            })
        },

        isDrawSeparator(index) {
            return (
                !(this.nextStepIsEnd && index === 0 && this.prevTab === 0) &&
                this.totalTabs != index &&
                (index === 0 ||
                    (index <= this.currentTab &&
                        !(this.nextStepIsEnd && this.prevTab < index + 1) &&
                        !(this.nextStepIsLastStep && index === this.currentTab)) ||
                    (index + 1 < this.totalTabs && this.tabs[index + 1].isValidated))
            )
        }
    }
}
</script>

<style scoped>
.tm-main.uk-section {
    padding-top: 30px;
}

.tm-main h4 {
    margin-top: 20px;
}
.tm-heading-fragment a {
    /* color: inherit; */
    text-decoration: none;
    /* color: #fc7426; */
}

.tm-heading-fragment .uk-icon {
    margin-left: 20px;
}

.tm-table .uk-padding {
    padding: 20px;
}

.tm-card-body.uk-card-body {
    height: 114px !important;
    padding: 20px 20px 60px 40px;
}

.tm-step {
    /* min-width: 840px !important;
    max-width: 950px; */
    width: 820px;
    height: 396px !important;
}

.tm-filter-info {
    /* min-width: 240px !important; */
    width: 260px;
}
.tm-filter-info .uk-card,
.tm-step .uk-card {
    min-height: 396px !important;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.tm-filter {
    min-height: 320px;
    /* height: 100vh; */
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    /* background: #f5f5f6; */
}

.tm-fl-test {
    /* background: #7b7b7b; */
    min-width: 280px !important;
}

.step-pills {
    height: 80px;
    align-items: stretch;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    cursor: pointer;
}

.step-pills .step-item {
    align-items: center;
    display: flex;
    flex-direction: row;
    padding-top: 24px;
    padding-right: 34px;
    padding-bottom: 24px;
    padding-left: 24px;
    position: relative;
    color: rgba(0, 0, 0, 0.38);
}

.step-pills .step-item.active {
    color: rgba(0, 0, 0, 0.8);
    font-weight: 600;
}

.step-pills .step-item.validated {
    color: rgba(0, 0, 0, 0.7);
}

.step-pills .step-item a {
    text-decoration: none;
    color: #7b7b7b;
}

.step-pills .step-item .tab-status {
    align-items: center;
    border-radius: 50%;
    display: inline-flex;
    margin-right: 8px;
    justify-content: center;
    height: 24px;
    min-width: 24px;
    width: 24px;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(0, 0, 0, 0.54);
}

.step-pills .step-item.active .tab-status {
    border: 2px solid #4b8aeb;
}

.step-pills .step-item.validated .tab-status {
    border: 1px solid #008011;
}

.step-pills .step-item.validated.active .tab-status {
    border: 2px solid #008011;
}

.step-pills .step-item .tab-label {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    line-height: 1;
    text-align: left;
}

.step-pills .step-header-item {
    /* display: block; */
    align-items: stretch;
    display: contents;
    /* display: flex; */
    flex-wrap: wrap;
    /* justify-content: space-between; */
    justify-content: space-around;
    overflow: visible;
}

.v-divider {
    border-color: rgba(0, 0, 0, 0.12);
    align-self: center;
    margin: 0 -18px;
    display: block;
    flex: 1 1 0px;
    max-width: 100%;
    height: 0;
    max-height: 0;
    /* border: solid; */
    border-width: thin 0 0;
    transition: inherit;
    overflow: visible;
}

@media (min-width: 1200px) {
    .tm-step-card-header.uk-card-header {
        padding: 20px 40px;
        /* height: 110px; */
    }
}

@media (max-width: 768px) {
    .tm-step-card-header.uk-card-header {
        display: flow-root;
        padding: 15px 20px;
        height: 110px;
    }
}
/*
        Animations
*/

.anim-next,
.anim-prev,
.anim-current {
    backface-visibility: hidden;
    z-index: 1;
}

/* moving */
.anim-next-move,
.anim-prev-move {
    transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.anim-next-enter-active,
.anim-prev-enter-active {
    transition: all 400ms ease-out;
}

.anim-current-enter-active {
    transition: opacity 0.5s;
}

.anim-next-leave-active,
.anim-prev-leave-active {
    transition: all 200ms ease-in;
    position: absolute;
    z-index: 0;
}

.anim-current-leave-active {
    transition: opacity 0.5s;
    position: absolute;
    z-index: 0;
}

/* appear at */

.anim-next-enter {
    transform: translateX(40%);
    opacity: 0;
}

.anim-prev-enter {
    transform: translateX(-5%);
    opacity: 0;
    transition: all 0.3s linear;
}

.anim-current-enter,
.anim-current-leave-to {
    opacity: 0;
}

/* disappear to */
.anim-next-leave-to {
    transform: translateX(-10%);
    opacity: 0;
}

.anim-prev-leave-to {
    transform: translateX(100%);
    transition: all 0.3s linear;
    opacity: 0;
}

.uk-offcanvas-bar .uk-card-small.uk-card-body {
    padding: 10px 10px;
}

.tab-answer {
    position: absolute;
    top: 65px;
    left: 0px;
}

.tm-text-small {
    font-size: 12px;
}
</style>
