<template lang="pug">
.sidebar-component(:class="{ 'sidebar-component--minimized': minimized }")
  .sidebar-component__wrapper
    CustomScrollbar.sidebar-custom-scrollbar
      SidebarItemV3(
        v-for="(option, index) in options"
        :key="index"
        :item="option" 
        :minimized="minimized")
</template>

<script setup lang="ts">
import CustomScrollbar from '@components/CustomScrollbar/CustomScrollbar.vue'
import SidebarItemV3 from '@/components/SidebarItem/SidebarItemV3.vue'


// @ts-ignore
const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  minimized: {
    type: Boolean,
    required: true
  }
})

</script>

<style scoped lang="scss">
.sidebar-component {
  width: $sidebar-width;
  position: relative;
  height: 100%;
  transition: width 0.3s ease-out;

  @include max(1199) {
    position: fixed;
    z-index: 1;
  }

  &--minimized {
    width: $sidebar-width-minimized;
    transition: width 0.3s ease-in-out, left 0.25s ease-in-out;
    z-index: 0;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    top: $navbar-height;
    background: $white-color;
    transition: width 0.3s ease-out, left 0.3s 0.13s ease-out;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
    }
}

.sidebar-custom-scrollbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $white-color;
  padding: 16px;
  padding-right: 8px;
}
</style>
