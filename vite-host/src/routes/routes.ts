import { RouteRecordRaw } from 'vue-router'

import IndexPage from '../pages/index.vue'
import SecondPage from '@/pages/Second/index.vue'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: [
      {
        name: 'second',
        path: '/second',
        component: SecondPage
      }
    ]
  },
  
] as RouteRecordRaw[]
