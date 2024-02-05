import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Keycloak from 'keycloak-js'
import { config, options } from '@/auth/keycloak'

// Locales
import ruLocale from '@/locales/ru.json'
import enLocale from '@/locales/en.json'

// import './style.css'
import App from './App.vue'

// Styles
import "./assets/styles/bootstrap.css"
import "./assets/styles/app.scss"

// Routes
import routes from  './routes/routes'

//Plugins
// import RemoteLoaderPlugin from './src/plugins/remote-loader'
import KeycloakPlugin from '@/plugins/keycloak'

const i18n = createI18n({
    locale: 'ru',
    messages: {
        ru: ruLocale,
        en: enLocale
    }
})

const router = createRouter({
    history: createWebHistory(),
    routes
})

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

const _keycloak = new Keycloak(config)

_keycloak.init(options).then((auth: boolean) => {
    if(auth) {
        app.use(KeycloakPlugin, {
            keycloak: _keycloak
        })
        app.mount('#app');
    }
})
