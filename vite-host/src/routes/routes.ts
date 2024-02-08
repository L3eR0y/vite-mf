import { RouteRecordRaw } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import MainPage from '@/pages/Main/index.vue'

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
      }
    ]
  },  
] as RouteRecordRaw[]
