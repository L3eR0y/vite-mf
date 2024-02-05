import { RouteRecordRaw } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import SecondPage from '../pages/Second/index.vue'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: [
      {
        name: 'second',
        path: '/second',
        component: SecondPage,
        children: [
          {
            name: 'second-1',
            path: 'second-1',
            component: SecondPage,
          },
          {
            name: 'second-2',
            path: 'second-2',
            component: SecondPage,
          },
          {
            name: 'second-3',
            path: 'second-3',
            component: SecondPage,
          },
        ]
      }
    ]
  },
  
] as RouteRecordRaw[]
