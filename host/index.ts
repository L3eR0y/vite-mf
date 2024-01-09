import { createApp, defineAsyncComponent } from "vue"
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './src/App.vue'

const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes
})
const pinia = createPinia()
const app = createApp(App);

app.use(router)
app.use(pinia)

app.mount('#app');
