import { RouteRecordRaw } from 'vue-router'

import IndexPage from '../pages/index.vue'
import MainPage from '@/pages/Main/index.vue'
import ServicesPage from '@/pages/Services/index.vue'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: [
      {
        name: 'main',
        path: '/main',
        component: MainPage
      },
      {
        name: 'services',
        path: '/services',
        component: ServicesPage
      },
    ]
  },
  
] as RouteRecordRaw[]
