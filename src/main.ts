import { createApp, defineAsyncComponent } from "vue"
import router from './routes'
import App from './App.vue'

import '@/styles/normalize.scss'
import '@/styles/app.scss'

import keycloakPlugin from './plugins/keycloakPlugin'

const RemoteButton = defineAsyncComponent(() => import('app2/RemoteButton'))
// const HostApp = defineAsyncComponent(() => import('./views/Home.vue'))

const app = createApp(App);

app.use(router)
app.use(keycloakPlugin)

app.component('remote-button', RemoteButton)

app.mount('#app');