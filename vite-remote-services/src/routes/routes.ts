import { RouteRecordRaw } from 'vue-router'
// import { vue2ToVue3 } from '@/utils/index'

import IndexPage from '../pages/index.vue'
import MainPage from '@/pages/Main/index.vue'
import SecondPage from '@/pages/Second/index.vue'
import ServicesPage from '@/pages/Services/index.vue'
// import KitApp from 'kit/App'


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
      {
        name: 'second',
        path: '/second',
        component: SecondPage
      },
      // {
      //   name: 'kit',
      //   path: '/kit',
      //   component: vue2ToVue3(KitApp, 'kit-app')
      // }
    ]
  },
  
] as RouteRecordRaw[]


// import { RouteRecordRaw } from 'vue-router'

// import IndexPage from '@/pages/index.vue'
// import MainPage from '@/pages/Main/index.vue'
// import ProfileService from 'profile-service/Profile'

// export default [
//   {
//     path: '/',
//     name: 'App',
//     component: IndexPage,
//     children: [
//       {
//         name: 'main',
//         path: '/main',
//         component: MainPage
//       },
//       {
//         name: 'profile',
//         path: '/profile',
//         component: ProfileService
//       }
//     ]
//   },  
// ] as RouteRecordRaw[]

