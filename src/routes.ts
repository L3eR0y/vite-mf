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
          component: () => import('templateRemoteEntry/AdministrationView')
        },
        {
          path: '/remote-app',
          name: 'remote-app',
          component: () => import('@pages/RemoteApp/RemoteApp.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@pages/ComponentsTesting/index.vue')
        },
        {
          path: '/expirements',
          name: 'expirements',
          component: () => import('@pages/Expirements/index.vue')
        },
      ]
    },
  ],
})
