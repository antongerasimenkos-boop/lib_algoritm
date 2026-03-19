<template>
    <div id="templates-table">
        <h3 :class="isMobiledView ? 'uk-h5 uk-padding-small' : 'uk-h3 uk-padding uk-flex uk-flex-between'">
            <!-- uk-margin uk-margin-top uk-margin-left -->
            <div class="uk-text-left">Список шаблонов:</div>
            <div class="tm-table-infocount uk-text-muted uk-text-right uk-margin-right uk-text-small">
                Отобрано шаблонов {{ filteredList.length && filteredList.length }}
            </div>
        </h3>

        <div class="">
            <SearchLine @search="getSearch">Поиск</SearchLine>
            <table
                class="tm-table uk-table uk-table-hover uk-table-small uk-table-middle uk-table-divider uk-table-responsive"
                :class="{ 'uk-table-striped': !loading }"
            >
                <thead>
                    <tr>
                        <!-- <th class="uk-table-shrink"></th>
                        <th class="uk-table-shrink">Preserve</th>
                        <th class="uk-table-expand">Expand + Link</th>
                        <th class="uk-width-small">Truncate</th>
                        <th class="uk-table-shrink uk-text-nowrap">Shrink + Nowrap</th> -->
                        <th
                            v-for="(header, index) in headers"
                            :key="`header-${index}`"
                            :class="{
                                'uk-table-shrink': header.width === 'shrink',
                                'uk-table-expand': header.width === 'expand',
                                'uk-width-small': header.width === 'small',
                                'tm-width-smallest': header.width === 'smallest',
                                'uk-width-1-2': header.width === 'half',
                                'uk-width-2-5': header.width === '2-5',
                                'uk-text-nowrap': header.nowrap === 'on',
                                'uk-text-truncate': header.truncate === 'on',
                                'tm-text-sortable': sortedField == header.value,
                                'tm-header-item': isFieldSortable(header.value)
                            }"
                            :uk-tooltip="'title: ' + (header.name || '') + '; delay: 500; pos: top'"
                            @click="orderBy(header.value)"
                        >
                            <!-- Заголовки столбцов и сортировка -->
                            <div class="uk-inline">
                                {{ header.text }}
                                <span v-if="header.sortable" :class="arrowsWrapper(header.value, css.arrowsWrapper)">
                                    <span
                                        v-if="!showOrderArrow(header, '')"
                                        class="tm-form-icon tm-icon-hide"
                                        uk-icon="icon: arrow-up"
                                    />
                                    <span
                                        v-if="showOrderArrow(header, '')"
                                        class="tm-form-icon"
                                        :class="arrowAnimation"
                                        uk-icon="icon: arrow-up"
                                    />
                                </span>
                            </div>
                        </th>
                        <!-- ИЗБРАННОЕ Иконка Звезда -->
                        <th class="tm-width-smallest uk-text-truncate uk-text-center">
                            <span
                                :class="favoritesFilterEnable ? 'tm-table-icon' : ''"
                                class="tm-favorites uk-icon uk-margin-small-right"
                                uk-icon="icon: star"
                                :uk-tooltip="'title: Избранное; delay: 500; pos: top'"
                                @click="favoritesFilterEnableClick()"
                            ></span>
                        </th>
                    </tr>
                </thead>
                <tfoot class="uk-text-right uk-margin uk-text-middle" v-if="!loading">
                    <tr class="" v-if="paginatedList.length">
                        <td :colspan="headers.length + 1">
                            <TemplatesTablePagination
                                :isMobiledView="isMobiledView"
                                :itemsArrayLength="filteredList.length"
                                :pagination="pagination"
                                @paginated="getPaginated"
                            ></TemplatesTablePagination>
                        </td>
                    </tr>
                    <tr class="uk-text-center" v-else>
                        <td :colspan="headers.length + 1">Ничего не найдено.</td>
                    </tr>
                </tfoot>
                <tbody>
                    <tr class="uk-text-center" v-if="loading">
                        <td :colspan="headers.length + 1">
                            <div uk-spinner="ratio: 2"></div>
                        </td>
                    </tr>
                    <tr v-for="(template, index) in paginatedList" :key="`template-${index}`" v-else>
                        <td
                            v-for="(col, indx) in headers"
                            :key="`cols-${indx}`"
                            :class="{
                                'uk-table-link': col.value === 'title',
                                'uk-text-nowrap': col.nowrap === 'on',
                                'uk-text-truncate': col.truncate === 'on'
                            }"
                            :uk-tooltip="
                                col.truncate === 'on'
                                    ? 'title: ' +
                                      (col.value != 'title' ? template[col.value] || '' : template.name || '') +
                                      '; delay: 500; pos: top'
                                    : ''
                            "
                        >
                            <a
                                class="uk-link-reset"
                                :class="{ 'uk-text-truncate': col.truncate === 'on' }"
                                v-if="col.value === 'title'"
                                @dblclick="onDblClickGoToLink(index)"
                                @touchstart.stop.prevent="touchStart(index)"
                                >{{ template.name }}</a
                            >
                            {{ template[col.value] }}
                        </td>
                        <!-- ИЗБРАННОЕ -->
                        <td class="uk-text-truncate uk-text-center">
                            <span
                                :class="template.favorite ? 'tm-table-icon' : ''"
                                class="tm-favorites uk-icon uk-margin-small-right"
                                uk-icon="icon: star; ratio: 0.9"
                                :uk-tooltip="template.favorite ? 'Удалить из избранного' : 'Добавить в избранное'"
                                @click="addToFaforites(index)"
                            ></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import UIkit from 'uikit'
import { lsdb } from '@/js/lsdb'
import { mapActions, mapGetters } from 'vuex'
import { simpleStore } from '@/js/simpleStore'
import { getTemplates /*, generateTemplates*/ } from '@/js/getTemplates.js'
import { goLink } from '@/js/goLink'
import SearchLine from '@/components/SearchLine.vue'
import TemplatesTablePagination from '@/components/TemplatesTablePagination.vue'

import { DEFAULT_TEMPATES_TABLE_SHOW_ID_COLUMN } from '@/config/config'

let clickTimer

export default {
    name: 'TemplatesTable',
    components: {
        SearchLine,
        TemplatesTablePagination
    },
    props: {
        msg: String,
        isMobiledView: {
            type: Boolean,
            default: false
        },
        fields: {
            type: Array,
            default: function() {
                return []
            }
        },
        steps: {
            type: Object,
            default: function() {
                return {}
            },
            required: true
        },
        // totalTabs: {
        //     type: Number,
        //     default: 0
        // }
        sortField: {
            type: String,
            default: null
        },
        sort: {
            type: String,
            default: null
        },
        onlyShowOrderedArrow: {
            type: Boolean,
            default: true
        },
        css: {
            type: Object,
            default: () => ({
                table: '',
                arrowsWrapper: 'arrows-wrapper',
                arrowUp: 'arrow-up',
                arrowDown: 'arrow-down'
            })
        }
    },
    data() {
        return {
            totalTemplates: 0,
            templates: [],
            loading: true,
            options: {},
            search: '',
            pagination: {
                pageStart: 0,
                pageStop: 0,
                itemsPerPage: 5
            },
            favorites: [],
            sortedField: this.sortField,
            sortedDir: this.sort,
            arrowAnimation: '',
            favoritesFilterEnable: false
            // filterAccumulator: {},
        }
    },

    watch: {
        environment(newVal) {
            this.pagination.itemsPerPage = newVal.itemsPerPage || 5
        },
        options: {
            handler() {
                this.getDataFromApi()
            },
            deep: true
        }
    },

    computed: {
        ...mapGetters('filters', ['filters']),
        ...mapGetters('environment', ['environment']),

        headers() {
            return this.getHeaders()
        },

        filteredList() {
            // Search Filter
            let result = this.search
                ? this.templates.filter(item => {
                      let res =
                          (item.name && item.name.toLowerCase().includes(this.search.toLowerCase())) ||
                          (item.note && item.note.toLowerCase().includes(this.search.toLowerCase())) ||
                          // item.number - Type = String! Not a Number!
                          (typeof item.number === 'number'
                              ? item.number
                                    .toString()
                                    .toLowerCase()
                                    .includes(this.search.toLowerCase())
                              : item.number.toLowerCase().includes(this.search.toLowerCase()))
                      return res
                  })
                : [...this.templates]

            if (this.filters.length) {
                // Wizzad Filters
                result = result.filter(item => {
                    return this.filterIncludes(item.filter)
                })
            }

            if (this.favoritesFilterEnable) {
                result = result.filter(item => {
                    return item.favorite === true
                })
            }

            // Calculate filters units count
            this.setFilterAccumulator(result)

            // Sorting
            if (this.sortedField != '' && this.sortedDir != '') {
                const params = {
                    sortField: this.sortedField,
                    sort: this.sortedDir
                }
                result = this.sortList(result, params)
            }
            return result
        },

        paginatedList() {
            if (!this.filteredList) return []

            let len = this.filteredList.length
            let start
            let end = 0

            if (this.pagination.itemsPerPage != '-1') {
                if (len < this.pagination.pageStart) this.resetPagination()
                start = this.pagination.pageStart
                end = this.pagination.pageStop
                if (end === 0) end = start + parseInt(this.pagination.itemsPerPage)
                if (end > len) end = len
            } else {
                start = 0
                end = len
            }

            return this.filteredList.slice(start, end)
        }
    },

    mounted() {
        // this.headers = this.getHeaders()
        this.getDataFromApi()
        let pg = lsdb.fetch('pagination') || false
        this.pagination.itemsPerPage = pg ? pg.itemsPerPage : '5'
        this.resetFiltersAccumulator()
    },

    beforeDestroy() {
        if (clickTimer) {
            clearTimeout(clickTimer)
            clickTimer = null
        }
    },

    methods: {
        ...mapActions('environment', ['setEnvironment']),
        ...mapActions('filters', ['setFiltersAccumulator', 'resetFiltersAccumulator']),

        getSearch(val) {
            this.search = val
        },

        getPaginated(val) {
            this.pagination = val
            let obj = this.environment
            obj.itemsPerPage = val.itemsPerPage
            this.setEnvironment(Object.assign({}, obj))
            lsdb.save('pagination', val)
        },

        getDataFromApi() {
            this.loading = true
            this.options.page = 1
            this.options.itemsPerPage = 10000
            // load LS DB
            this.favorites = lsdb.fetch('favorites') || []
            this.apiCall().then(data => {
                this.templates = data.items
                this.totalTemplates = data.total
                this.loading = false
                this.$emit('onLoaded', true)
            })
        },

        async apiCall() {
            return await getTemplates().then(data => {
                const { page, itemsPerPage } = this.options
                let items = this.convertTemplatesToItems(data)
                let state = simpleStore.state.currentBD
                /**
                 * @todo Antipatern
                 * remove set templates from here
                 */
                simpleStore.setCurrentBD({ ...state, templates: { ...items } })

                const total = items.length !== undefined ? 0 : items.length

                if (itemsPerPage > 0) {
                    items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                }

                return {
                    items,
                    total
                }
            })
        },

        convertTemplatesToItems(templates) {
            if (!templates && !this.steps.length) return

            let record = {}
            let len = Object.keys(this.steps).length
            let new_steps = { ...this.steps }
            delete new_steps[len - 1]

            // временное ограничение на 4 уровня
            // let counter = 0
            for (let key in Object.keys(new_steps)) {
                record[this.steps[key].teg] = ''
                // if (counter > 2) break
                // counter++
            }

            let items = []
            let item = {}
            // Apply filters
            templates.forEach(template => {
                item = template
                if ('filter' in template) {
                    item = { ...template, ...this.filterToRecords(template.filter, record, template.id) }
                }
                items.push(item)
            })
            // Apply Favorites
            if (this.favorites.length > 0) {
                items.forEach(template => {
                    template.favorite = this.favorites.find(item => item.id === template.id) ? true : false
                })
            }
            return items
        },

        filterToRecords(filter = [], record = {}, id) {
            if (!this.fields.length && !this.steps.length) return
            // let record = {
            //     vid: '',
            //     dogovor: '',
            //     subtype: '',
            //     subject: ''
            //     // subvid: '',
            //     // add: ''
            // }

            // Зачистить поля
            for (let key of Object.keys(record)) {
                record[key] = ''
            }

            let index = -1
            let length = filter.length
            if (length != 0) {
                for (let key of Object.keys(record)) {
                    index++
                    if (index < length) {
                        try {
                            if (filter[index].length) {
                                // Мультифильтр
                                let str = ''
                                filter[index].forEach(element => {
                                    str = str ? str + ', ' + this.fields[element].name : this.fields[element].name
                                })
                                record[key] = str
                            } else {
                                record[key] = this.fields[filter[index]].name
                            }
                        } catch {
                            console.log('catch ', id)
                        }
                    }
                }
            }
            return record
        },

        // values = item.filter - Array like [0,4,8,10]
        filterIncludes(values) {
            if (!values) return false
            if (!values.length) return false
            let result = true

            try {
                this.filters.forEach(element => {
                    let item = values[this.fields[element].level]
                    if (Array.isArray(item)) {
                        result = result && item.some(el => el == element)
                    } else {
                        result = result && item == element
                    }
                })
            } catch {
                // some wrong
                console.log('Error in find filters includes.')
                result = false
            }

            return result
        },

        addToFaforites(index) {
            // Unique - ID (TODO: guid)
            let editedIndex = -1
            if (this.favorites.length > 0) {
                editedIndex = this.favorites.findIndex(item => item.id == this.paginatedList[index].id)
            }
            if (editedIndex != -1) {
                // delete item in favorites
                let tmp = this.templates.find(item => item.id == this.paginatedList[index].id)
                tmp.favorite = false
                this.paginatedList[index].favorite = false
                this.favorites.splice(editedIndex, 1)
                lsdb.save('favorites', this.favorites)

                return
            } else {
                // add item to favorites
                const tag = this.filters.length ? this.fields.find(f => f.id == this.filters[0]).data : null
                this.favorites.push({
                    id: this.paginatedList[index].id,
                    name: this.paginatedList[index].name,
                    // link: this.paginatedList[index].link,
                    type: this.paginatedList[index].type,
                    color: '',
                    tag
                })
                let tmpIndex = this.templates.findIndex(item => item.id == this.paginatedList[index].id)

                if (tmpIndex != -1) {
                    let tmp = this.templates[tmpIndex]
                    tmp.favorite = true
                    this.$set(this.templates, tmpIndex, tmp)
                }

                lsdb.save('favorites', this.favorites)
            }
        },

        favoritesFilterEnableClick() {
            this.favoritesFilterEnable = !this.favoritesFilterEnable
        },

        onDblClickGoToLink(index) {
            // console.log(index, this.paginatedList[index])
            if (!this.filters?.length) {
                UIkit.modal
                    .alert(
                        `<h3 class="uk-h3 uk-text-warning">Внимание!</h3> <p class="uk-text-center"> Для открытия документа необходимо сперва выбрать критерий фильтра!</p>`,
                        {
                            labels: {
                                ok: 'Закрыть'
                            }
                        }
                    )
                    .then(function() {
                        return
                    })
            } else {
                const tag = this.fields.find(f => f.id == this.filters[0]).data
                goLink({ ...this.paginatedList[index], tag })
            }
        },

        touchStart(link) {
            if (clickTimer == null) {
                clickTimer = setTimeout(function() {
                    clickTimer = null
                }, 500)
            } else {
                clearTimeout(clickTimer)
                clickTimer = null
                this.onDblClickGoToLink(link)
            }
        },

        setFilterAccumulator(result) {
            let list = {}
            if (result.length) {
                result.forEach(item => {
                    item.filter.forEach(val => {
                        if (Array.isArray(val)) {
                            val.forEach(item => {
                                list[item] = ++list[item] || 1
                            })
                        } else {
                            list[val] = ++list[val] || 1
                        }
                    })
                })
            }
            this.setFiltersAccumulator({ ...list })
        },

        resetPagination() {
            this.pagination.pageStart = 0
            this.pagination.pageStop = this.pagination.itemsPerPage
        },

        getHeaders() {
            let len = Object.keys(this.steps).length
            let new_steps = { ...this.steps }
            delete new_steps[len - 1]

            let headers = []

            DEFAULT_TEMPATES_TABLE_SHOW_ID_COLUMN &&
                headers.push({ text: '№ ', value: 'number', width: 'smallest', truncate: 'on', sortable: true })
            headers.push({
                text: 'Имя шаблона',
                align: 'start',
                value: 'title',
                width: '2-5',
                // width: 'half',
                truncate: 'on',
                sortable: true
            })

            headers.push({
                text: 'Прим.',
                name: 'примечание',
                align: 'start',
                value: 'note',
                width: 'small',
                truncate: 'on',
                sortable: true
            })

            /*
                { text: 'Вид', value: 'vid', width: 'small', truncate: 'on' },
                { text: 'Дог/ДС', value: 'type', width: 'small', truncate: 'on' },
                { text: 'Подтип', value: 'subtype', width: 'small', truncate: 'on' },
                { text: 'Предмет', value: 'subject', width: 'small', truncate: 'on' },
                { text: 'Подвид', value: 'subvid', width: 'small', truncate: 'on' },
                { text: 'Доп.', value: 'add', width: 'small', truncate: 'on' }
                // { text: 'Избранное', value: 'favorites', width: 'small', truncate: 'on' }
            */

            // let index = 0
            for (let item in new_steps) {
                headers.push({
                    text: new_steps[item].shortname,
                    value: new_steps[item].teg,
                    name: new_steps[item].name,
                    width: 'small',
                    truncate: 'on',
                    sortable: true
                })
            }

            return headers
        },

        arrowsWrapper(field, className) {
            if (this.sortedField === field && this.sortedDir) {
                return `${className} centralized`
            }
            return className
        },

        updateData() {
            const params = {
                sortField: this.sortedField,
                sort: this.sortedDir
            }
            this.$emit('on-update', params)
            // this.$set(this, this.templates, this.sortList(this.templates, params))
        },

        orderBy(field) {
            if (this.isFieldSortable(field)) {
                if (this.sortedField === field) {
                    // this.sortedDir = this.sortedDir === 'asc' ? 'desc' : 'asc'
                    if (this.sortedDir === 'desc') {
                        this.sortedDir = ''
                        this.sortedField = ''
                        this.arrowAnimation = this.css.arrowDown
                    }
                    if (this.sortedDir === 'asc') {
                        this.sortedDir = 'desc'
                        this.arrowAnimation = this.css.arrowUp
                    }
                } else {
                    this.sortedDir = 'asc'
                    this.sortedField = field
                }
                this.updateData()
            }
        },

        isFieldSortable(field) {
            const foundHeader = this.headers.find(item => item.value === field)
            return foundHeader && foundHeader.sortable
        },

        headerItemClass(item, className = []) {
            const classes = className.join(' ')
            return item && item.sortable ? classes : `${classes} no-sortable`
        },

        showOrderArrow(item, sortDir) {
            if (this.onlyShowOrderedArrow) {
                return this.sortedField === item.value && this.sortedDir !== sortDir
            }
            return this.sortedField !== item.value || (this.sortedField === item.value && this.sortedDir === sortDir)
        },

        sortList(items, params) {
            if (!items) return
            if (params.sortField != '' && params.sort != '') {
                const sortBy = params.sortField == 'title' ? 'name' : params.sortField
                const itemsSorted = items.sort((a, b) => {
                    const sortA = a[sortBy]
                    const sortB = b[sortBy]

                    if (params.sort == 'desc') {
                        if (sortA < sortB) return 1
                        if (sortA > sortB) return -1
                        return 0
                    } else {
                        if (sortA < sortB) return -1
                        if (sortA > sortB) return 1
                        return 0
                    }
                })
                return itemsSorted
            }
        }
    }
}
</script>

<style scoped>
.tm-table-infocount {
    margin-top: 8px;
}

.uk-table {
    font-size: 14px !important;
}

.uk-h3.uk-padding {
    padding: 20px 0px 0px 20px;
    margin-left: 20px;
}

h3 {
    margin: 0px 0 0;
}

ul {
    /* list-style-type: none; */
    padding: 0;
}

li {
    /* display: inline-block; */
    margin: 0 10px;
}

a {
    color: #42b983;
}

.uk-icon[uk-icon='heart'] svg path {
    fill: #ff0000;
}

.uk-icon[uk-icon='clock'] svg circle {
    fill: #ffed1d;
}

td :focus {
    outline: none;
}

tr :focus {
    outline: none;
}

th {
    height: 44px;
}

.tm-favorites {
    cursor: pointer;
}

.tm-width-smallest {
    width: 80px;
}

.tm-table {
    cursor: default;
}

.tm-table .tm-header-item {
    cursor: pointer;
    transition: color 0.15s ease-in-out;
}

.tm-table .tm-header-item:hover {
    color: #444;
}

.tm-table .tm-header-item.no-sortable {
    cursor: default;
}

.tm-table .tm-header-item.no-sortable:hover {
    color: #337ab7;
}

.tm-table .tm-header-item .arrows-wrapper {
    display: inline-flex;
    flex-direction: column;
    margin-left: 8px;
    justify-content: space-between;
    align-items: center;
}

.tm-table .tm-header-item .arrows-wrapper.centralized {
    justify-content: center;
}

.tm-table .arrow {
    transition: color 0.15s ease-in-out;
}

.tm-table .tm-text-sortable {
    color: #444;
}

.tm-table .tm-form-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    /* left: 0; */
    width: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

th:hover .tm-icon-hide:not(.arrow-down) {
    opacity: 0.6;
    transition: 0.5s ease-in-out;
}

.tm-table .arrow-up {
    transform: translate(10px) rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transition: transform 400ms ease !important;
}

.tm-table .arrow-down {
    transform: translate(10px) rotate(0deg);
    -webkit-transform: rotate(0deg);
    transition: transform 400ms ease !important;
}

.tm-icon-hide {
    opacity: 0;
}

/*  Стиль для иконки избранного (tm-table-icon) перенесён в глобальный CSS в App.vue*/
</style>
