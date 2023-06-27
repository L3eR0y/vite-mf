import { createApp } from "vue"
import router from './routes'
import App from './App.vue'
import '@/styles/normalize.scss'
import '@/styles/app.scss'

createApp(App).use(router).mount('#app')