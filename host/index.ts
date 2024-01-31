import { createApp } from "vue"
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Locales
import ruLocale from '@/locales/ru.json'
import enLocale from '@/locales/en.json'

// Stores
// import { useMainStore } from './src/stores/main'

// Styles
import "./src/assets/styles/bootstrap.css"
import "./src/assets/styles/app.scss"

// Routes
import routes from  './src/routes/routes'

import App from './src/App.vue'


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

const app = createApp(App);

app.use(pinia)
app.use(KeycloakPlugin)
app.use(router)
app.use(i18n)

app.mount('#app');
