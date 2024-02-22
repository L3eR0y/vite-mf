import { RouteRecordRaw } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import MainPage from '@/pages/Main/index.vue'
import ProfileService from 'profile-service/Profile'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: []
  },  
] as RouteRecordRaw[]
