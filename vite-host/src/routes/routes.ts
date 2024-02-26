import { RouteRecordRaw } from 'vue-router'

import IndexPage from '@/pages/index.vue'
import MainPageRoutes from 'vite-mf-remote/MainPageRoutes'
import AccordionPage from '@/pages/accordion/index.vue'
import Acc1Page from '@/pages/accordion/acc1/index.vue'
import Acc2Page from '@/pages/accordion/acc2/index.vue'
import Acc3Page from '@/pages/accordion/acc3/index.vue'

export default [
  {
    path: '/',
    name: 'App',
    component: IndexPage,
    children: [
      {
        name: 'accordion',
        path: '/accordion',
        component: AccordionPage,
        children: [
          {
            name: 'acc1',
            path: 'acc1',
            component: Acc1Page,
          },
          {
            name: 'acc2',
            path: 'acc2',
            component: Acc2Page,
          },
          {
            name: 'acc3',
            path: 'acc3',
            component: Acc3Page,
          }
        ]
      },
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
