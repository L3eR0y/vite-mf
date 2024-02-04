<template lang="pug">
.second-page
  .wrapper
    //- Accordion(:element="accordion_element" :expanded="!minimized")
    //-   template(#head)
    //-     NavItem(:item="accordion_element" :minimized="minimized" @click.native="onHandleMenuItemClick")
    //-   template(#body)
    //-     .submenu-container(v-if="accordion_element.submenu")
    //-       NavItem(              
    //-         v-for="(submenuItem, index) in accordion_element.submenu"
    //-         :key="(submenuItem.route || '') + index"
    //-         :minimized="minimized"
    //-         is-submenu-item
    //-         class="submenu-item"
    //-         :item="submenuItem")
    //- Accordion(:element="accordion_element")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Accordion from '@components/Accordion/Accordion.vue'
import NavItem from '@components/NavItem/NavItem.vue'
import type { SidebarMenuItem } from '@/types/sidebar.type'

const minimized =  ref(false)

const accordion_element: SidebarMenuItem = {
    id: '1',
    name: 'second',
    route: 'second',
    title: 'Первый пункт меню',
    icon: {
    name: 'services'
    },
    submenu: [
    {
        id: '11',
        name: 'second11',
        route: 'second11',
        title: 'Подменю 1',
        icon: {
        
        },
    },
    {
        id: '12',
        name: 'second12',
        route: 'second11',
        title: 'Подменю 2',
        icon: {},
    },
    {
        id: '13',
        name: 'second13',
        route: 'second11',
        title: 'Подменю 3',
        icon: {},
    },
    ]
}

function onHandleMenuItemClick(): void {
  console.log('minim: ', minimized)
  minimized.value = !minimized.value
}
</script>

<style lang="scss" scoped>
.second-page {
    width: 100%;
}

.wrapper {
    width: 245px;
}

.submenu-container {
  border-left: 1px solid $sidebar-color-vertical-separator;
  margin-left: 1rem;
  width: 100%;
}
</style>
