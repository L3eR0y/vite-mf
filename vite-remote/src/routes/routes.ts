import { RouteRecordRaw } from 'vue-router'

import MainPage from '../pages/Main/index.vue'
import SecondPage from '../pages/Second/index.vue'

export default [
  {
    path: '/',
    name: 'App',
    component: MainPage,
    children: [
      {
        name: 'second',
        path: '/second',
        component: SecondPage
      }
    ]
  },
  
] as RouteRecordRaw[]
