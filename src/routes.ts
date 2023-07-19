import { createRouter, createWebHistory } from 'vue-router'


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@pages/Home.vue'),
      children: [
        {
          path: '/app1',
          name: 'app1',
          component: () => import('app2/RemoteButton')
        },
        {
          path: '/remote-app',
          name: 'remote-app',
          component: () => import('@pages/RemoteApp/RemoteApp.vue')
        },
      ]
    },
  ],
})
