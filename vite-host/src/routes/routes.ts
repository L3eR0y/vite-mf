import { RouteRecordRaw } from 'vue-router'

import IndexPage from '../pages/index.vue'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: [
    ]
  },
  
] as RouteRecordRaw[]
