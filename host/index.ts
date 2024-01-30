import { createApp } from "vue"
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Stores
import { useMainStore } from './src/stores/main'

// Styles
import "./src/assets/styles/bootstrap.css"
import "./src/assets/styles/app.scss"

// Routes
import routes from  './src/routes/routes'

import App from './src/App.vue'

//Plugins
// import RemoteLoaderPlugin from './src/plugins/remote-loader'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

// router.beforeEach((to, from, next) => {
//   const store = useMainStore()
//   next()
// })

const app = createApp(App);

app.use(router)
app.use(pinia)

app.mount('#app');
