<template>
    <div id="favorites-board">
        <div class="tm-main uk-section uk-section-default" v-cloak>
            <!-- v-if="fieldsIsReady" -->
            <div class="uk-container uk-container-large uk-position-relative">
                <div class="tm-nav-manage uk-visible-toggle uk-box-shadow-hover-medium" tabindex="-1">
                    <!-- <div uk-grid> -->
                    <div class="uk-flex">
                        <h3 class="uk-h3 uk-align-center uk-margin-medium uk-margin-left">Управление Избранным</h3>
                        <!-- <div class="uk-width-auto"> -->
                        <span>
                            <ul class="uk-iconnav uk-hidden-hover uk-flex-left">
                                <li>
                                    <span class="tm-form-file">
                                        <a
                                            href="#"
                                            uk-icon="icon: pull"
                                            uk-tooltip="title: Импорт закладок; delay: 750"
                                            @click.prevent="toLoadFileClickHandler()"
                                        >
                                            <!-- <app-icon name="export" /> --></a
                                        ><input type="file" id="file-input" accept=".json" @change="onFilePicked" />
                                        <!-- uk-icon="icon: upload"  uk-hidden-hover -->
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <a
                                            uk-icon="icon: push"
                                            href="#"
                                            uk-tooltip="title: Экспорт закладок; delay: 750"
                                            @click.prevent="save()"
                                        >
                                            <!-- <app-icon name="import" />  -->
                                        </a></span
                                    >
                                    <!-- uk-icon="icon: download" uk-icon="icon: import-i"-->
                                </li>
                                <li>
                                    <span>
                                        <a
                                            href="#"
                                            uk-icon="icon: trash"
                                            uk-tooltip="title: Очистить избранное; delay: 750"
                                            @click.prevent="deleteAllFavorites()"
                                        >
                                        </a
                                    ></span>
                                </li>
                            </ul>
                            <!-- </div> -->
                        </span>
                    </div>
                </div>

                <div class="uk-margin uk-margin-left uk-text-lead uk-text-light" v-if="favorites.length === 0">
                    Вы ещё ничего не добавили в избранное.
                </div>
                <div class="uk-margin">
                    <ul
                        id="sortable-element"
                        ref="sortableElement"
                        class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s"
                        :uk-sortable="'handle: ' + isSortableHandelCard ? '.uk-card' : '.uk-sortable-handle'"
                        uk-grid
                    >
                        <!--
                        :uk-sortable="'handle: ' + isSortableHandelCard ? '.uk-card' : '.uk-sortable-handle'"
                        -->
                        <li v-for="(item, index) in favorites" :key="`cols-${index}`" :id="item.id">
                            <div
                                class="uk-height-small uk-card uk-card-default uk-card-hover uk-card-body"
                                :class="{ 'uk-light': item.color, 'uk-text-small': !hideMobileMenu }"
                                :style="{ backgroundColor: item.color }"
                            >
                                <div class="uk-visible-toggle" tabindex="-1">
                                    <div class="uk-grid">
                                        <!-- <div class="uk-position-top-left uk-text-left uk-padding-small"> -->
                                        <div class="uk-width-expand">
                                            <div class="uk-text-uppercase" v-if="!item.title">шаблон {{ item.id }}</div>
                                            <div class="uk-text-uppercase" v-else>{{ item.title }}</div>
                                        </div>
                                        <!-- <div class="uk-position-top-right uk-text-right uk-padding-small"> -->
                                        <div class="uk-width-auto">
                                            <ul class="uk-hidden-hover uk-iconnav">
                                                <li v-if="!isSortableHandelCard">
                                                    <a
                                                        href="#"
                                                        class="uk-sortable-handle"
                                                        uk-icon="icon: more"
                                                        uk-tooltip="title: Переместить; delay: 500"
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        uk-icon="icon: pencil"
                                                        uk-tooltip="title: Редактировать; delay: 500"
                                                        @click.prevent="editItem(index)"
                                                    ></a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        uk-icon="icon: trash"
                                                        uk-tooltip="title: Удалить; delay: 500"
                                                        @click.prevent="deleteFavoriteItem(index)"
                                                    ></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div
                                        class="tm-link-area uk-text-center uk-text-middle uk-text-break"
                                        :class="{ 'uk-padding-small': hideMobileMenu }"
                                        @dblclick="onDblClickGoToLink(item)"
                                        @touchstart.stop.prevent="touchStart(item)"
                                    >
                                        {{ item.name }}
                                    </div>
                                    <div
                                        v-if="hideMobileMenu"
                                        class="uk-position-bottom-right uk-text-left uk-padding-small"
                                        uk-tooltip="title: Создать и открыть документ в новом окне; delay: 750"
                                        @click="onDblClickGoToLink(item)"
                                        @touchstart.stop.prevent="touchStart(item)"
                                    >
                                        <span
                                            class="tm-link-area uk-icon"
                                            :class="item.color ? 'tm-link-chevron-white' : 'tm-link-chevron-black'"
                                            uk-icon="icon: chevron-right; ratio: 1.3"
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <EditFavoriteItems
            :editedItem="editedItem"
            :isShow="isShowModalEditDialog"
            @setItemFavorite="getEditedItem"
            @getStateEditModalDialog="getStateEditModalDialog"
        />
    </div>
</template>

<script>
// import FiltersBar from '@/components/FiltersBar.vue'
import EditFavoriteItems from '@/components/EditFavoriteItems.vue'

// import {  mapGetters } from 'vuex'
import Vue from 'vue'
import { lsdb } from '@/js/lsdb'
import UIkit from 'uikit'
import { mapGetters } from 'vuex'
import { saveToFile, loadFile } from '@/js/file.js'
import { importFavoritesFromFile } from '@/js/importFavorites.js'
import { goLink } from '@/js/goLink'

let sortableFavorites, clickTimer, sortableElement

export default {
    name: 'FavoritesBoard',

    components: {
        // FiltersBar
        EditFavoriteItems
    },

    data: () => ({
        fieldsIsReady: false,
        favorites: [],
        realFavorites: [],
        hideMobileMenu: true,
        editedItem: {
            index: 0,
            id: 0,
            name: '',
            title: '',
            color: ''
        },
        isShowModalEditDialog: false,
        // Choise how drag and drop sortable card: all card or show icons and drag on it
        // default - card
        isSortableHandelCard: true
        // clickTimer: null
    }),

    computed: {
        ...mapGetters('environment', ['environment'])
    },

    watch: {
        environment(newVal) {
            this.hideMobileMenu = newVal.hideMobileMenu
        }
    },

    mounted() {
        let $this = this
        this.favorites = lsdb.fetch('favorites') || []
        this.fieldsIsReady = true

        UIkit.util.ready(() => {
            sortableElement = UIkit.sortable('#sortable-element', {
                handle: this.isSortableHandelCard ? '.uk-card' : '.uk-sortable-handle'
            })
            // console.log('sortable element: ', sortableElement)
        })

        sortableFavorites = function(e, sortable) {
            let tmp = []
            if (!$this.favorites.length) return false
            sortable.items.forEach(function(item) {
                // TODO IMPROVE PERFOMANCE
                tmp.push($this.favorites.find(val => val.id == item.id))
            })

            lsdb.save('favorites', tmp)
            $this.realFavorites = tmp

            // if (tmp != $this.favorites) {
            //     Vue.nextTick(() => {
            //         setTimeout(() => $this.$set($this, 'favorites', tmp), 500)
            //     })
            // }

            let template = $this.favorites.find(val => val.id == e.detail[1].id)
            let name = template.title || 'Шаблон ' + template.id
            UIkit.notification(`"${name}" перемещён.`, { status: 'success', timeout: 1000 })
        }

        Vue.nextTick(() => {
            // UIkit.util.on(document, 'stop', '#sortable-element', sortableFavorites)
            UIkit.util.on('#sortable-element', 'moved', sortableFavorites)
        })
        this.hideMobileMenu = this.environment.hideMobileMenu
        this.realFavorites = this.favorites
    },

    beforeDestroy() {
        this.favorites = []
        UIkit.util.off('#sortable-element', 'stop', sortableFavorites) // '#sortable-element'

        if (clickTimer) {
            clearTimeout(clickTimer)
            clickTimer = null
        }

        sortableElement.$destroy(true)
        this.realFavorites = []
    },

    methods: {
        deleteFavoriteItem(index) {
            let $this = this
            let template = this.favorites[index]
            let name = template.title || 'Шаблон ' + template.id
            UIkit.modal
                .confirm(
                    `<h3 class="uk-h3 uk-text-danger">Предупреждение!</h3> <p class="uk-text-center"> Вы действительно хотите удалить из избранного эту закладку ? </p><p class="uk-text-center"> ${name}</p>`,
                    {
                        labels: {
                            cancel: 'Нет',
                            ok: 'Да'
                        }
                    }
                )
                .then(
                    function() {
                        $this.favorites.splice(index, 1)
                        $this.realFavorites.splice(index, 1)
                        lsdb.save('favorites', $this.favorites)
                    },
                    function() {
                        // console.log('Rejected.')
                        return
                    }
                )
        },

        editItem(index) {
            this.$set(this, 'editedItem', this.favorites[index])
            // this.$set(this, 'editedItem', this.realFavorites[index])
            this.isShowModalEditDialog = true
        },

        getEditedItem(val) {
            let index = this.realFavorites.findIndex(item => item.id === val.id)
            // this.$set(this.favorites, index, val)
            this.$set(this.realFavorites, index, val)
            lsdb.save('favorites', this.realFavorites)
        },

        getStateEditModalDialog(val) {
            if (this.isShowModalEditDialog === val) return
            this.isShowModalEditDialog = val
        },

        onDblClickGoToLink(item) {
            // console.log(item)
            goLink(item)
        },

        touchStart(link) {
            // event.stopPropagation()
            // event.preventDefault()
            if (clickTimer == null) {
                clickTimer = setTimeout(function() {
                    clickTimer = null
                    // alert('single')
                }, 500)
            } else {
                clearTimeout(clickTimer)
                clickTimer = null
                // alert('double')
                this.onDblClickGoToLink(link)
            }
        },

        deleteAllFavorites() {
            let $this = this
            UIkit.modal
                .confirm(
                    `<h3 class="uk-h3 uk-text-danger">Предупреждение!</h3> <p class="uk-text-center">Вы действительно хотите полностью удалить избранное ?</p>`,
                    {
                        labels: {
                            cancel: 'Нет',
                            ok: 'Да'
                        }
                    }
                )
                .then(
                    function() {
                        $this.$set($this, 'favorites', [])
                        $this.realFavorites = []
                        lsdb.save('favorites', [])
                    },
                    function() {
                        return
                    }
                )
        },

        save() {
            if (this.favorites.length === 0) {
                UIkit.notification('Вы ещё не создали ни одной закладки.', 'warning')
                return
            }
            let data = {}
            data.info = {
                version: '1.0',
                date: new Date().toString(),
                type: 'questionare_template'
            }
            data.favorites = this.realFavorites
            saveToFile(JSON.stringify(data, null, 2), 'favorites.json')
            UIkit.notification(`Файл сохранён успешно.`, 'success')
        },

        async onFilePicked(event) {
            event.preventDefault()
            const files = event.target.files
            let result = await loadFile(files)
            if (result.state) {
                const tmp = importFavoritesFromFile(result.contents)
                tmp.state ? UIkit.notification(result.msg, 'success') : UIkit.notification(tmp.msg, 'warning')
                if (tmp.state && tmp.data) {
                    this.$set(this, 'favorites', tmp.data)
                    lsdb.save('favorites', tmp.data)
                }
            } else {
                UIkit.notification(result.msg, 'danger')
            }
        },

        toLoadFileClickHandler() {
            document.getElementById('file-input').click()
        }
    }
}
</script>

<style scoped>
.tm-main.uk-section {
    padding-top: 30px;
}

@media (min-width: 1200px) {
    .uk-card-body {
        padding: 10px 10px !important;
    }
}

.uk-card-body {
    padding: 10px 10px;
}

.uk-height-small {
    height: 160px;
}

.uk-light {
    /* color: white; */
    color: rgba(255, 255, 255, 0.9);
}

.uk-light .uk-iconnav > * > a {
    color: rgba(255, 255, 255, 0.8);
}

.tm-link-area {
    cursor: pointer;
}

.tm-link-area.uk-padding-small {
    padding: 15px 10px 15px 10px;
}

.tm-main div :focus {
    outline: none;
}

.tm-link-chevron-white {
    color: white;
}

.tm-link-chevron-black {
    color: #666;
}

.tm-form-file input[type='file'] {
    /* display: inline-block;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    cursor: pointer; */
    display: none;
}

.tm-nav-manage {
    margin-bottom: 30px;
}

.tm-nav-manage :hover {
    background: #f8f8f8;
}

.tm-nav-manage .uk-h3 {
    margin-bottom: 10px !important;
    cursor: default;
}

.tm-nav-manage .uk-iconnav {
    padding: 5px;
}
</style>
