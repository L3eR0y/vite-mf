<template lang="pug">
.main-layout
  .main-layout__navbar
    Navbar(@toggle-sidebar="onToggleSideBar")
  .main-layout__wrapper
    .sidebar
      Sidebar(:minimized="store.sidebar.minimized" @toggle-sidebar="onToggleSideBar")
    .main-view
      router-view
</template>
  
<script setup lang="ts">
  import { onMounted, getCurrentInstance } from 'vue'
  import { useMainStore }  from '@/stores/main'
  import Navbar from '../../components/Navbar/Navbar.vue'
  import Sidebar from '@/components/Sidebar/Sidebar.vue'

  const store = useMainStore()
  const app = getCurrentInstance()

  function onToggleSideBar():void {
    console.log(store.sidebar.minimized)
    store.sidebar.minimized ? store.showSidebar() : store.hideSidebar()
  }

  onMounted(() => {
    console.log('Mounted: ', app)
  })
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
      height: 100%;
    }
  }
  
  .sidebar {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
  }

  .main-view {
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    min-width: 0;
    overflow: hidden;
    position: relative;
  }
</style>
  