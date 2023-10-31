import { createApp, defineAsyncComponent } from "vue"
import router from './routes'
import App from './App.vue'

import '@src/styles/normalize.scss'
import '@src/styles/app.scss'

import keycloakPlugin from './plugins/keycloakPlugin'

const RemoteButton = defineAsyncComponent(() => import('templateRemoteEntry/AdministrationView'))
// const HostApp = defineAsyncComponent(() => import('./views/Home.vue'))

const app = createApp(App);

app.use(router)
app.use(keycloakPlugin)

app.component('remote-button', RemoteButton)

app.mount('#app');