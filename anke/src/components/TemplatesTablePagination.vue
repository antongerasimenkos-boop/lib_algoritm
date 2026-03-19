<template>
    <div id="templates-table-pagination">
        <div class="uk-inline">
            <slot></slot>
            <span :class="isMobiledView ? 'tm-pagination-margin-small-right' : 'uk-margin-right'">
                {{ rowsPerPageMsg }}
            </span>
            <span
                class="tm-pagination-group"
                :class="isMobiledView ? 'tm-pagination-margin-small-right' : 'uk-margin-right'"
            >
                <div class="tm-paginate-select">
                    <!-- uk-form-custom="target: > * > span:first-child" -->
                    <select
                        id="paginate-element-selector"
                        name="paginateElementSelector"
                        v-if="itemsPerPageOptions"
                        v-model="selectedValue"
                        autocomplete="off"
                        @blur="rotateArrowDown()"
                        @click="rotateArrowClick()"
                        @change="sendValue($event)"
                    >
                        <option
                            v-for="(el, index) in itemsPerPageOptions"
                            :value="el"
                            :key="`paginate-options-${index}`"
                        >
                            {{ el != '-1' ? el : 'Все' }}
                        </option>
                    </select>
                    <span class="tm-pagination-highlight"></span>
                    <span class="tm-pagination-bar"></span>
                    <button class="tm-pagination-btn" type="button" tabindex="-1" v-on:click.self.prevent>
                        <span></span>
                        <span :class="arrowAnimation" class="tm-paginaton-arrow" uk-icon="icon: chevron-down"></span>
                    </button>
                </div>
            </span>

            <span
                class="tm-pagination-info"
                :class="isMobiledView ? 'tm-pagination-margin-small-right' : 'uk-margin-right'"
            >
                {{ genPaginationInfo }}
            </span>
            <div class="tm-pagination-action">
                <a
                    link="#"
                    class="tm-btn-pagination uk-icon-button"
                    :class="isMobiledView ? 'tm-pagination-margin-small-right' : 'uk-margin-right'"
                    uk-icon="chevron-left"
                    @click.prevent.stop="prevPage()"
                    :disabled="pageNumber === 0"
                ></a>
                <a
                    link="#"
                    class="tm-btn-pagination uk-icon-button"
                    :class="isMobiledView ? 'tm-pagination-margin-small-right' : 'uk-margin-right'"
                    uk-icon="chevron-right"
                    @click.prevent.stop="nextPage()"
                    :disabled="pageNumber >= pageCount - 1"
                ></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TemplatesTablePagination',
    props: {
        isMobiledView: {
            type: Boolean,
            default: false
        },

        rowsPerPageMsg: {
            type: String,
            default: 'Строк на странице:'
        },

        showedMsg: {
            type: String,
            default: 'показано: '
        },

        itemsArrayLength: {
            type: Number,
            default: 0,
            required: true
        },

        itemsPerPageOptions: {
            type: Array,
            default: () => [5, 10, 15, 25, 50, -1]
        },

        pagination: {
            type: Object,
            default: function() {
                return {
                    // pageStart: {
                    //     type: Number,
                    //     default: 0
                    // },
                    pageStart: 0,
                    pageStop: 0,
                    itemsPerPage: 5
                }
            }
        }
        // changepage: {
        //     type: Boolean,
        //     default: false
        // }
    },

    data() {
        return {
            arrowAnimation: '',
            arrowFocused: false,
            pageNumber: 0
        }
    },

    computed: {
        selectedValue: {
            get: function() {
                return parseInt(this.pagination.itemsPerPage) || -1
            },

            set(value) {
                return value
            }
        },
        pageCount() {
            return this.pagination.itemsPerPage != '-1'
                ? Math.ceil(this.itemsArrayLength / parseInt(this.pagination.itemsPerPage))
                : 1
        },

        genPaginationInfo() {
            let children = []
            //   const itemsLength = this.pagination.itemsLength
            const itemsLength = this.itemsArrayLength
            let pageStart = this.pagination.pageStart
            let pageStop = this.pagination.pageStop

            if (itemsLength && parseInt(this.pagination.itemsPerPage)) {
                pageStart = this.pagination.pageStart + 1
                pageStop =
                    itemsLength < this.pagination.pageStop || this.pagination.pageStop < 0
                        ? itemsLength
                        : this.pagination.pageStop

                children = [pageStart, pageStop, itemsLength]
                let shMsg = this.isMobiledView ? '' : this.showedMsg

                return shMsg + children[0] + '-' + children[1] + ' из ' + children[2]
            }

            return ''
        }
    },
    mounted() {
        this.pagination.pageStop = this.pagination.pageStart + parseInt(this.pagination.itemsPerPage)
    },

    watch: {
        selectedValue(newVal) {
            // this.pagination.pageStart ?? TODO: Учитывать
            this.pagination.pageStop = this.pagination.pageStart + parseInt(newVal)
        },

        changepage(newVal) {
            this.pageNumber = 0
            newVal && this.changePage(0)
        },

        itemsArrayLength() {
            this.pageNumber = 0
            this.changePage(0)
        }
    },

    methods: {
        nextPage() {
            if (this.pageNumber < this.pageCount - 1) {
                this.pageNumber++
                this.changePage(this.pageNumber)
            }
        },

        prevPage() {
            if (this.pageNumber > 0) {
                this.pageNumber--
                this.changePage(this.pageNumber)
            }
        },

        changePage(page) {
            // Validate page
            if (page < 0) this.pageNumber = 0
            if (page > this.pageCount) {
                page = this.pageCount
            }

            this.pagination.pageStart = page * parseInt(this.pagination.itemsPerPage)
            this.pagination.pageStop = this.pagination.pageStart + parseInt(this.pagination.itemsPerPage)

            this.$emit('paginated', this.pagination)
        },

        sendValue(event) {
            let el = event.target
            // el.blur()
            this.pagination.itemsPerPage = el.value
            this.pagination.pageStop = this.pagination.pageStart + this.pagination.itemsPerPage
            this.pageNumber = 0
            this.changePage(0)
        },

        rotateArrowDown() {
            this.arrowFocused = false
            this.arrowAnimation = 'tm-pagination-arrow-down'
        },

        rotateArrowClick() {
            if (this.arrowFocused) {
                this.arrowAnimation = 'tm-pagination-arrow-down'
            } else {
                this.arrowAnimation = 'tm-pagination-arrow-up'
            }
            this.arrowFocused = !this.arrowFocused
        }
    }
}
</script>

<style scoped>
.tm-pagination-margin-small-right {
    margin-right: 2px !important;
}

.tm-pagination-action {
    display: inline-block;
}

.tm-btn-pagination.uk-icon-button:not(:hover, :active) {
    border-radius: 0px !important;
    /* color: inherit-background-color; */
    background: #fff;
}

.tm-btn-pagination.uk-icon-button {
    background: #fff;
    color: #333;
}

.tm-btn-pagination.uk-icon-button[disabled='disabled'],
.tm-btn-pagination.uk-icon-button:disabled {
    background: #fff;
    color: #ccc;
    cursor: default;
}

.tm-pagination-btn {
    min-width: 48px;
    align-items: flex-end;
    text-align: right;
    letter-spacing: normal;
    max-width: 100%;
    background: none;
    border: none;
}

.tm-pagination-group {
    position: relative;
    align-items: center;
    max-width: 100%;
    min-width: 0;
    width: 100%;
}

.tm-paginate-select {
    display: inline-block;
    position: relative;
    max-width: 100%;
    vertical-align: middle;
}

.tm-paginate-select select {
    align-items: flex-start;
    flex: 1 1 auto;
    min-width: 48px;
    font-size: 14px;
    letter-spacing: normal;
    max-width: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    text-align: left;
    border: none;
    color: inherit;
    font: inherit !important;
    outline: none;
    scroll-behavior: smooth;
    border-bottom: 1px solid #757575;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -ms-user-select: none;
    user-select: none;
    background: inherit !important;
    background-color: inherit !important;
}

.tm-paginaton-arrow {
    pointer-events: none;
}

select:focus {
    outline: none;
}

/* BOTTOM BARS ================================= */
.tm-pagination-bar {
    position: relative;
    display: contents;

    width: 100%;
}
.tm-pagination-bar:before,
.tm-pagination-bar:after {
    content: '';
    height: 2px;
    top: 98%;
    width: 0;
    /* bottom: 1px; */
    position: absolute;
    background: #1e87f0;
    /* transition: 0.4s ease all; */
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    -moz-transition: 0.4s ease all;
    -webkit-transition: 0.4s ease all;
}
.tm-pagination-bar:before {
    left: 50%;
}
.tm-pagination-bar:after {
    right: 50%;
}

/* active state */
select:focus ~ .tm-pagination-bar:before,
select:focus ~ .tm-pagination-bar:after {
    width: 50%;
}

/* HIGHLIGHTER ================================== */
.tm-pagination-highlight {
    position: absolute;
    height: 60%;
    /* width: 100px; */
    min-width: 48px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
}

/* active state */
select:focus ~ .tm-pagination-highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
    from {
        background: #1e87f0;
    }
    to {
        width: 0;
        background: transparent;
    }
}
@-moz-keyframes inputHighlighter {
    from {
        background: #1e87f0;
    }
    to {
        width: 0;
        background: transparent;
    }
}
@keyframes inputHighlighter {
    from {
        background: #1e87f0;
    }
    to {
        width: 0;
        background: transparent;
    }
}

.tm-pagination-arrow-up {
    transform: translate(10px) rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transition: transform 400ms ease !important;
}

.tm-pagination-arrow-down {
    transform: translate(10px) rotate(0deg);
    -webkit-transform: rotate(0deg);
    transition: transform 400ms ease !important;
}

.tm-pagination-info {
    position: relative;
    right: 0;
    width: 140px !important;
}
</style>
