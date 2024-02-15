import { RouteRecordRaw } from 'vue-router'

import IndexPage from '../pages/index.vue'
import MainPage from '@/pages/Main/index.vue'
import ProfilePage from '@/pages/Profile/index.vue'

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
        name: 'profile',
        path: '/profile',
        component: ProfilePage
      },
    ]
  },
  
] as RouteRecordRaw[]
