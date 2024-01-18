import { createApp, defineAsyncComponent } from "vue"
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './src/App.vue'

//Plugins
import RemoteLoaderPlugin from './src/plugins/remote-loader'

const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes
})
const pinia = createPinia()
const app = createApp(App);

app.use(router)
app.use(pinia)
app.use(RemoteLoaderPlugin, { router })

app.mount('#app');
