<template lang="pug">
.main-layout
  .main-layout__navbar
    Navbar(@toggle-sidebar="onToggleSideBar")
  .main-layout__wrapper
    .sidebar
      Sidebar(:visible="store.sidebar.minimized")
      //- router-link(to="/second") Second
      //- router-link(to="/second") Second
      //- router-link(to="/second") Second
      //- router-link(to="/second") Second
    .main-view
      router-view
</template>
  
<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useMainStore }  from '@/stores/main'
  import Navbar from '../../components/Navbar/Navbar.vue'
  import Sidebar from '@/components/Sidebar/Sidebar.vue'

  const store = useMainStore()

  function onPointClick(point: string): void {
    console.log('POINT CLICKED: ', point)
  }

  function onToggleSideBar():void {
    store.sidebar.minimized ? store.hideSidebar() : store.showSidebar()
  }

  onMounted(() => {
    console.log('Mounted: ', store)
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
    width: 10%;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
  }
</style>
  