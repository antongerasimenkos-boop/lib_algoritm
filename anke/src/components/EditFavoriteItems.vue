<template>
    <div id="edit-favorite-items" uk-modal>
        <div class="tm-modal-dialog uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h3 class="uk-h4 uk-text-danger">Редактирование закладки:<br /></h3>
                <p class="uk-text-meta">{{ editedItem.name }}</p>
            </div>
            <div class="uk-modal-body">
                <form class="uk-form-horizontal uk-margin-small uk-margin@l" v-on:submit.prevent="saveItem">
                    <fieldset class="uk-fieldset" id="tm-modal-favorite-edit-dialog">
                        <div class="uk-margin">
                            <label class="uk-form-label" for="efi-form-text-title">Заголовок</label>
                            <div class="uk-form-controls">
                                <div class="uk-inline">
                                    <!-- <span class="uk-form-icon" uk-icon="icon: pencil"></span> -->
                                    <input
                                        class="uk-input"
                                        id="efi-form-text-title"
                                        type="text"
                                        maxlength="26"
                                        minlength="4"
                                        required
                                        v-model.trim="titleModel"
                                        autocomplete="off"
                                    />
                                    <!-- @input="editedTitleChange" -->
                                </div>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="efi-form-text-name">Описание</label>
                            <div class="uk-form-controls">
                                <div class="uk-inline">
                                    <!-- <span class="uk-form-icon" uk-icon="icon: table"></span> -->
                                    <textarea
                                        class="uk-textarea"
                                        id="efi-form-text-name"
                                        type="text"
                                        maxlength="110"
                                        rows="3"
                                        required
                                        autocomplete="off"
                                        v-model.trim="nameModel"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            class="uk-margin"
                            uk-tooltip="title: Выберите цвет закладки.; pos: top-right; delay: 1000"
                            tabindex="-1"
                        >
                            <label class="uk-form-label" for="form-horizontal-select">Цвет</label>
                            <div class="uk-form-controls">
                                <div class="uk-inline">
                                    <span class="uk-form-icon" uk-icon="icon: paint-bucket"></span>

                                    <select class="uk-select" id="form-horizontal-select" v-model="colorModel">
                                        <option
                                            v-for="(option, index) in colorOptions"
                                            :key="`select-colors-${index}`"
                                            :value="option.value"
                                            style="width: 100%; padding: 4px"
                                            :style="{
                                                backgroundColor: option.value,
                                                color: option.value ? 'white' : ''
                                            }"
                                        >
                                            <div class="uk-card uk-card-default">
                                                {{ option.text }}
                                            </div>
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="uk-modal-footer uk-text-right">
                <button
                    class="uk-button uk-button-danger uk-margin-small-right"
                    :class="{ 'uk-button-small': !hideMobileMenu }"
                    id="modalconfirm-button"
                    autofocus
                    @click.prevent="saveItem()"
                >
                    Сохранить
                </button>
                <button
                    class="uk-button uk-button-primary uk-modal-close"
                    type="button"
                    :class="{ 'uk-button-small': !hideMobileMenu }"
                >
                    Отмена
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { DEFAULT_COLORS } from '@/config/config'
import { mapGetters } from 'vuex'
import UIkit from 'uikit'

let modal

export default {
    name: 'EditFavoriteItems',

    props: {
        editedItem: {
            type: Object,
            default: function() {
                return {
                    index: 0,
                    id: 0,
                    name: '',
                    title: '',
                    color: ''
                }
            },
            required: true
        },
        isShow: {
            type: Boolean,
            default: false,
            required: true
        }
    },

    computed: {
        ...mapGetters('environment', ['environment'])
    },

    watch: {
        environment(newVal) {
            this.hideMobileMenu = newVal.hideMobileMenu
        },

        isShow() {
            this.isShow ? this.openEditModalDialog() : this.closeEditModalDialog()
        },

        titleModel(newVal) {
            // newVal = this.escapeHTML(newVal)
            newVal = this.avoidHTML(newVal)
            this.titleModel = newVal.replace(/[\t\r\n]/g, ' ')
        },

        nameModel(newVal) {
            newVal = this.avoidHTML(newVal)
            this.nameModel = newVal.replace(/[\t\r\n]/g, ' ')
        }
    },

    data: () => ({
        fieldsIsReady: false,
        hideMobileMenu: true,
        colorOptions: [],
        selectedColor: '',
        titleModel: '',
        nameModel: '',
        colorModel: null
    }),

    mounted() {
        let $this = this
        this.colorOptions = DEFAULT_COLORS
        this.hideMobileMenu = this.environment.hideMobileMenu

        let el = document.querySelector('#edit-favorite-items')
        UIkit.util.on(el, 'hide', function() {
            // console.log('hide ')
            $this.$emit('getStateEditModalDialog', false)
        })

        UIkit.util.ready(function() {
            modal = UIkit.modal('#edit-favorite-items')
        })
    },

    methods: {
        openEditModalDialog() {
            this.hideMobileMenu = this.environment.hideMobileMenu
            this.$emit('getStateEditModalDialog', true)
            this.titleModel = this.editedItem.title ? this.editedItem.title : `Шаблон ` + this.editedItem.id
            this.nameModel = this.editedItem.name ? this.editedItem.name : this.titleModel
            this.colorModel = this.editedItem.color
            modal.show()
        },

        closeEditModalDialog() {
            modal.hide()
        },

        saveItem() {
            /* eslint-disable no-debugger */
            this.editedItem.title = this.titleModel
            this.editedItem.name = this.nameModel
            this.editedItem.color = this.colorModel
            this.$emit('setItemFavorite', this.editedItem)
            this.closeEditModalDialog()
        },

        escapeHTML(val) {
            const div = document.createElement('div')
            div.textContent = val
            return div.textContent
        },

        avoidHTML(text) {
            if (text.length == 0) return
            text = text.replace(/<style([\s\S]*?)<\/style>/gi, '')
            text = text.replace(/<script([\s\S]*?)<\/script>/gi, '')
            text = text.replace(/<\/div>/gi, '\n')
            text = text.replace(/<\/li>/gi, '\n')
            text = text.replace(/<li>/gi, '  *  ')
            text = text.replace(/<\/ul>/gi, '\n')
            text = text.replace(/<\/p>/gi, '\n')
            text = text.replace(/<br\s*[\\/]?>/gi, '\n')
            text = text.replace(/<[^>]+>/gi, '')
            text = text.replace(/&nbsp;/gi, ' ')
            return text
        }
    }
}
</script>

<style>
.uk-form-icon:not(.uk-form-icon-flip) + .uk-select,
.uk-form-icon:not(.uk-form-icon-flip) + .uk-textarea {
    padding-left: 40px !important;
}

.tm-modal-dialog .uk-inline {
    display: inline;
}

.tm-color-option {
    width: 100%;
    color: white;
    padding: 4px;
}

.tm-modal-dialog div :focus {
    outline: none;
}

@media (min-width: 960px) {
    .uk-form-horizontal .uk-form-controls {
        margin-left: 185px;
    }

    .uk-form-horizontal .uk-form-label {
        width: 170px;
    }
}

.uk-modal-footer {
    padding: 15px 20px;
}
</style>
