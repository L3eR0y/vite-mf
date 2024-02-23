<template lang="pug">
.main-layout
  .sidebar(:class="{ minimized: sidebar_minimized }")
    .sidebar__switcher(@click="onSidebarSwitcherClick" :class="{ mirrored: sidebar_minimized }") 
      svg(width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg")
        path(fill-rule="evenodd" clip-rule="evenodd" d="M14.7364 6.93548C15.0879 7.28695 15.0879 7.8568 14.7364 8.20827L10.5728 12.3719L14.7364 16.5355C15.0879 16.887 15.0879 17.4568 14.7364 17.8083C14.3849 18.1597 13.8151 18.1597 13.4636 17.8083L8.6636 13.0083C8.31213 12.6568 8.31213 12.087 8.6636 11.7355L13.4636 6.93548C13.8151 6.58401 14.3849 6.58401 14.7364 6.93548Z" fill="#98989A")
    .sidebar__logo 
    .sidebar__menu
      template(v-for="(el, _index) in sidebar_menu" :key="`smi-${_index}`")
        SBMenuItem(:item="el" :active="sidebar_menu_item_selected(el)" @click="onSidebarMenuItemClick(el)")
    .sidebar__footer
      SBMenuItem(:item="{title: 'Help'}" :active="sidebar_menu_item_selected({title: 'Help'})" @click="onSidebarMenuItemClick({title: 'Help'})")
      SBMenuItem(:item="{title: 'Log out'}" :active="sidebar_menu_item_selected({title: 'Log out'})" @click="onSidebarMenuItemClick({title: 'Log out'})")
  .content
    .content__navbar
      NavBar 
    .content__view
      RouterView
</template>
    
<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useMainStore }  from '@/stores/main'
  import { useRouter} from 'vue-router'
  // Types
  import type { SidebarMenuItem } from '@app-types/sidebar.type'

  // Components
  import SBMenuItem from '@components/SidebarMenuItem/SidebarMenuItem.vue'
  import NavBar from '@components/NavigationBar/NavigationBar.vue'

  const store = useMainStore()
  const router = useRouter()

  const selected_menu_item = reactive<SidebarMenuItem>({
    title: undefined
  })

  const sidebar_minimized = ref(false)

  const sidebar_menu = ref<SidebarMenuItem[]>([])

  const services = router.getRoutes().filter((route) => route.name === 'services')?.pop()

  services?.children.forEach((route) => {
    sidebar_menu.value.push({
      route: `/services/${route.path}`,
      name: route.name as string,
      title: route.name as string,
    })
  })

  function onSidebarSwitcherClick() {
    sidebar_minimized.value = !sidebar_minimized.value
  }

  function onSidebarMenuItemClick(element: SidebarMenuItem) {
    selected_menu_item.title = element.title
    element?.route && router.push({ path: element.route })
  }

  function sidebar_menu_item_selected(element: SidebarMenuItem): boolean {
    return selected_menu_item.title === element.title
  }

  onMounted(() => {
    console.log('ROUTER: ', services)
  })
</script>
    
<style lang="scss" scoped>
.main-layout {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: $bg-main;
}

.sidebar {
  position: relative;
  width: 340px;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: $bg-second;
  border-right: 1px $br-main solid;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;

  transition: width 0.7s;

  &__switcher {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $bg-second;
    border: 1px $br-main solid;
    border-radius: 50%;
    height: 32px;
    width: 32px;
    right: calc(0px - 16px);
    top: 26px;
    transition: transform 0.7s;
  }

  &__logo {
    height: 44px;
    width: 100%;
    // background-color: $bg-main;
    margin-bottom: 24px;
    border-radius: $br-radius-main;
  }

  &__menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 8px;
    margin-bottom: 24px;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px $br-main solid;
    padding-top: 16px;
    gap: 8px;
  }
}

.footer-item {
  background-color: transparent;
}

.minimized {
  width: 84px;
}

.mirrored {
  transform: rotate(180deg);
}


.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__navbar {
    width: 100%;
    height: 84px;
    background-color: $bg-second;
    border-bottom: 1px $br-main solid;
  }

  &__view {
    padding: 40px;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
    