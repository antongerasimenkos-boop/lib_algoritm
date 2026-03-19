<template>
    <div id="app">
        <nav class="uk-navbar-container" v-if="iSshow">
            <div class="uk-container-expand uk-margin">
                <div uk-navbar>
                    <div
                        class="uk-navbar-left"
                        :class="hideMobileMenu ? 'uk-margin-left' : 'uk-margin-small-left tm-nav-small'"
                    >
                        <a :href="logoLink" class="uk-navbar-item uk-logo" v-if="logoLink">
                            <img alt="Евраз" src="./assets/logo.svg" width="81" height="27" />
                        </a>
                        <router-link to="/" class="uk-navbar-item uk-logo" v-else>
                            <img alt="Евраз" src="./assets/logo.svg" width="81" height="27" />
                        </router-link>

                        <ul class="uk-navbar-nav">
                            <li>
                                <div class="uk-navbar-item">
                                    {{ messages.general_system.caption || '' }}
                                    <a
                                        class="uk-text-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        :href="messages.general_system.link || '/'"
                                        v-html="'&nbsp;' + messages.general_system.link_text || ''"
                                    >
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div
                        class="uk-navbar-right"
                        :class="hideMobileMenu ? 'uk-margin-right' : 'uk-margin-small-right tm-nav-small'"
                    >
                        <ul class="uk-navbar-nav">
                            <router-link to="/" v-slot="{ href, navigate, isExactActive }">
                                <li :class="[isExactActive && 'uk-active']">
                                    <a :href="href" @click="navigate">
                                        <span class="uk-icon uk-margin-small-right" uk-icon="icon: bolt"></span>
                                        {{ messages.apps.title }}
                                    </a>
                                </li>
                            </router-link>

                            <!-- <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"> -->
                            <router-link to="/favorites" v-slot="{ href, navigate, isExactActive }">
                                <li :class="[isExactActive && 'uk-active']">
                                    <a :href="href" @click="navigate">
                                        <span class="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>
                                        {{ messages.apps.favorites }}
                                    </a>
                                </li>
                            </router-link>

                            <!-- <li v-if="!hideMobileMenu"> -->
                            <li class="uk-hidden@l" v-if="$route.path != '/favorites'">
                                <a href="#" uk-toggle="target: #offcanvas-flip">
                                    <span class="uk-icon uk-margin-small-right" uk-icon="icon: settings"></span>
                                    <span class="uk-text-middle">
                                        {{ messages.apps.filters }}
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <router-view />
    </div>
</template>

<script>
import { DEFAULT_MESSAGES as configMessages, DEFAULT_LOGO } from '@/config/config.js'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'App',

    data: () => ({
        hideMobileMenu: true,
        messages: '',
        iSshow: false,
        logoImg: DEFAULT_LOGO?.img || '',
        logoLink: DEFAULT_LOGO?.link || ''
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
        this.messages = configMessages
        const mediaQuery = window.matchMedia('(min-width:768px)')
        // this.hideMobileMenu = mediaQuery.matches

        // this.environment.hideMobileMenu = mediaQuery.matches
        // this.setEnvironment(this.environment)
        this.setEnvironment({ hideMobileMenu: mediaQuery.matches })
        // const listener = e => this.setEnvironment({ hideMobileMenu: e.matches })

        // const $this = this
        const listener = e => {
            let obj = this.environment
            obj.hideMobileMenu = e.matches
            this.setEnvironment(Object.assign({}, obj))
            // this.$set(this, this.setEnvironment(Object.assign({}, obj)))
        }

        mediaQuery.addListener(listener)
        this.$once('hook:beforeDestroy', () => mediaQuery.removeListener(listener))

        this.hideMobileMenu = this.environment.hideMobileMenu
        this.iSshow = true
    },

    methods: {
        ...mapActions('environment', ['setEnvironment'])
    }
}
</script>

<style>
/* @import '../node_modules/uikit/dist/css/uikit.min.css'; */
@import '../node_modules/uikit/dist/css/uikit.my-theme.min.css';

.uk-navbar-nav > li.uk-active > a {
    color: #212121;
}
.uk-navbar-nav > li > a {
    color: #909090;
    transition: 0.1s ease-in-out;
    transition-property: color, background-color, border-color, box-shadow;
    position: relative;
    z-index: 1;
    font-weight: 400;
    text-transform: uppercase;
}
.navbar .brand,
.navbar .uk-logo,
.navbar .nav > li > a,
.navbar-search,
.uk-navbar-item,
.uk-navbar-nav > li > a,
.uk-navbar-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    min-height: 80px;
    padding: 0 24px;
    font-size: 14px;
    font-family: inherit;
    text-decoration: none;
}

.tm-nav-small .navbar .brand,
/* .tm-nav-small .uk-logo, */
.tm-nav-small .navbar .nav > li > a,
.tm-nav-small .navbar-search,
.tm-nav-small .uk-navbar-item,
.tm-nav-small .uk-navbar-nav > li > a,
.tm-nav-small .uk-navbar-toggle {
    min-height: 80px;
    padding: 0 10px;
    font-size: 12px;
    font-family: inherit;
}

.tm-nav-small .uk-logo {
    font-size: 14px;
}

.uk-link,
a {
    color: #ec2178;
    text-decoration: none;
    cursor: pointer;
}

.uk-navbar-nav > li.uk-active > a::before {
    height: 2px;
}
.uk-navbar-nav > li > a::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    bottom: -1px;
    height: 0;
    background-color: #ec2178;
    transition: 0.15s ease-in-out;
    transition-property: background-color, border-color, box-shadow, height, right;
    left: 24px;
    right: 24px;
}

.tm-nav-small .uk-navbar-nav > li > a::before {
    left: 12px;
    right: 12px;
}

/* .tm-table-icon.uk-icon[uk-icon='icon: bookmark; ratio: 0.9'] svg {
    color: black;
} */

.tm-table-icon.uk-icon[uk-icon='icon: bookmark; ratio: 0.9'] svg polygon {
    fill: #39f;
}

.tm-table-icon.uk-icon[uk-icon='icon: star; ratio: 0.9'] svg {
    color: #39f;
}

.tm-table-icon.uk-icon[uk-icon='icon: star'] svg {
    color: rgb(16, 103, 190);
}

.tm-table-icon.uk-icon[uk-icon='icon: star; ratio: 0.9'] svg polygon {
    fill: #39f;
}
</style>
