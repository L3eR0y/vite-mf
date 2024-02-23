import { RouteRecordRaw } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import MainPageRoutes from 'vite-mf-remote/MainPageRoutes'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: [
      {
        name: 'services',
        path: '/services',
        children: [
          ...(MainPageRoutes[0].children || [])
        ]
      }
    ]
  },  
] as RouteRecordRaw[]
