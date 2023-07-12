import { createApp, defineAsyncComponent } from "vue"
// import router from './routes'
import App from './App.vue'

import '@/styles/normalize.scss'
import '@/styles/app.scss'

const RemoteApp = defineAsyncComponent(() => import('app2/app'))
// const RemoteBtn = defineAsyncComponent(() => import('app2/button'))

// const app = createApp(App)


const app = createApp(App);

app.component('remote-app', RemoteApp)
// app.component('remote-btn', RemoteBtn)

app.mount('#app');