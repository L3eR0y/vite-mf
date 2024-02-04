<template lang="pug">
.sidebar-menu-item()
  slot
    Accordion(:expanded="!minimized" :item="item")
      template(#head)
        NavItem(:item="item" :minimized="minimized")
      template(#body)
        .submenu-container(v-if="item.submenu")
          NavItem.submenu-item(              
            v-for="(submenuItem, index) in item.submenu"
            :key="(submenuItem.route || '') + index"
            :minimized="minimized"
            submenu-item
            :item="submenuItem")
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
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