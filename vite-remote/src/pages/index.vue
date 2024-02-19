<template lang="pug">
.main-layout
  .main-layout__navbar
    Navbar(@toggle-sidebar="onToggleSideBar")
  .main-layout__wrapper
    .sidebar
      SidebarV3(:minimized="store.sidebar.minimized" @toggle-sidebar="onToggleSideBar" :options="sidebar_menu_items")
    .main-view
      router-view
</template>

<script setup lang="ts">
  import { reactive} from 'vue'
  import { useMainStore }  from '@/stores/main'
  import type { SidebarMenu } from '@/types/sidebar.type'
  import Navbar from '@/components/Navbar/Navbar.vue'

  import SidebarV3 from '@/components/Sidebar/SidebarV3.vue'
  // import emitter from "@/utils/event-bus.ts"

  const store = useMainStore()
  // const event_bus = emitter();

  const sidebar_menu_items: SidebarMenu = reactive<SidebarMenu>([
    {
      name: 'main',
      route: 'main',
      title: 'Главная страница',
      icon: {
        name: 'services',
        color: 'black'
      }
    },
    {
      id: '2',
      name: 'third',
      route: 'third',
      title: 'Второй пункт меню',
      icon: {
        name: 'services'
      },
      submenu: [
        {
          id: '21',
          name: 'second11',
          route: 'second11',
          title: 'Подменю 1',
          icon: {

          },
        },
        {
          id: '22',
          name: 'second12',
          route: 'second11',
          title: 'Подменю 2',
          icon: {},
        },
        {
          id: '23',
          name: 'second13',
          route: 'second11',
          title: 'Подменю 3',
          icon: {},
        },
      ]
    }
  ])

  function onToggleSideBar(): void {
    store.sidebar.minimized ? store.showSidebar() : store.hideSidebar()
  }


</script>

<style lang="scss" scoped>
  .main-layout {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    &__navbar {
      width: 100%;
      position: relative;
    }

    &__wrapper {
      display: flex;
      height: calc(100% - 3.5rem); //высота хедера
    }
  }

  .sidebar {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
  }

  .main-view {
    @include scroll();

    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: hidden;
    position: relative;
    overflow-y: auto;
  }
</style>
