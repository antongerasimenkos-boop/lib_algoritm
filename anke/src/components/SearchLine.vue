<template>
    <div id="search-line">
        <form novalidate @submit.prevent="">
            <div class="group uk-search">
                <input
                    class="uk-search-input"
                    type="text"
                    v-model="search"
                    @keyup="$emit('search', $event.target.value)"
                    required
                />
                <!-- <template v-if="icon"> -->
                <span
                    class="uk-form-icon uk-form-icon-flip"
                    uk-icon="icon: search; ratio: 0.8"
                    v-if="!search && icon"
                ></span>
                <span
                    class="tm-search-close uk-form-icon uk-form-icon-flip"
                    uk-icon="icon: close; ratio: 0.8"
                    v-if="search"
                    @click="clearSearch"
                ></span>
                <!-- </template> -->
                <span class="highlight"></span>
                <span class="bar"></span>
                <!-- SLOT - IS AS PLACEHOLDER -->
                <label><slot></slot></label>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SearchLine',
    props: {
        icon: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isIconSearch: false,
            search: ''
        }
    },
    methods: {
        clearSearch() {
            this.search = ''
            this.$emit('search', '')
        }
    }
}
</script>

<style scoped>
.group {
    position: relative;
    margin: 20px 20px 10px 20px;
    max-width: 100%;
}

.group.uk-search {
    display: block;
}

input {
    padding: 10px 0px 10px 0px;
    align-items: flex-start;
    display: flex;
    /* display: block; */
    width: 100%;
    flex: 1 1 auto;
    font-size: 14px;
    letter-spacing: normal;
    max-width: 100%;
    text-align: left;
    border: none;
    border-bottom: 1px solid #757575;
}

input[type='search']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
}

input[type='search']::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
}

input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
    display: none;
}

input:focus {
    outline: none;
}

/* LABEL ======================================= */
label {
    color: #999;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 0px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus ~ label,
input:valid ~ label {
    top: -20px;
    font-size: 12px;
    color: #1e87f0;
}

/* BOTTOM BARS ================================= */
.bar {
    position: relative;
    display: block;
    width: 100%;
}
.bar:before,
.bar:after {
    content: '';
    height: 2px;
    top: 0px;
    width: 0;
    /* bottom: 1px; */
    position: absolute;
    background: #1e87f0;
    /* transition: 0.4s ease all; */
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    -moz-transition: 0.4s ease all;
    -webkit-transition: 0.4s ease all;
}
.bar:before {
    left: 50%;
}
.bar:after {
    right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
    width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
}

/* active state */
input:focus ~ .highlight {
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

.tm-search-close {
    cursor: pointer;
}

.tm-search-close.uk-form-icon {
    pointer-events: inherit;
}
</style>
