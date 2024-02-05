<template lang="pug">
.sidebar-menu-item()
  slot
    Accordion(:expanded="!minimized && routeEqual" :item="item")
      template(#head)
        NavItem(:item="item" :minimized="minimized" @click="onMenuItemClick")
      template(#body)
        .submenu-container(v-if="item.submenu")
          NavItem.submenu-item(              
            v-for="(submenuItem, index) in item.submenu"
            :key="(submenuItem.route || '') + index"
            :minimized="minimized"
            submenu-item
            :item="submenuItem"
            @click="onSubmenuItemClick(submenuItem)")
  </template>
  
  <script setup lang="ts">
  import { toRefs, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import type { SidebarMenuItem } from '@/types/sidebar.type'
  
  import Accordion from '@components/Accordion/Accordion.vue'
  import NavItem from '@components/NavItem/NavItem.vue'
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    minimized: {
      type: Boolean,
      required: true
    }
  })
  
  const { item } = toRefs(props)
  const router = useRouter()
  const route = useRoute()
  const regExp = new RegExp(`^${item.value.route}`, 'gi')

  const routeEqual = computed(() => {
    return item.value.route && !!(route.name as string).match(regExp)
  })
  
  function onMenuItemClick() {
    router.push({
      name: item.value.name || 'App'
    })
  }
  
  function onSubmenuItemClick(submenuitem: SidebarMenuItem) {
    console.log('Submenuitem: ', submenuitem)
    router.push({
      name: submenuitem.name || 'App'
    })
  }
  </script>
  
  <style scoped lang="scss">
    .submenu-container {
      border-left: 1px solid $sidebar-color-vertical-separator;
      margin-left: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      width: 100%;
    }
  </style>