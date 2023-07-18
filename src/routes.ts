import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from "vue"

// const RemoteButton = defineAsyncComponent(() => import('app2/RemoteButton'))
// const HostApp = defineAsyncComponent(() => import('./views/Home.vue'))

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/app1',
          name: 'app1',
          component: () => import('app2/RemoteButton')
        },
        {
          path: '/remote-app',
          name: 'remote-app',
          component: () => import('./pages/RemoteApp/RemoteApp.vue')
        },
      ]
    },
  ],
})
