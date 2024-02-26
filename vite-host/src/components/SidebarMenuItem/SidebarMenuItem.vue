<template lang="pug">
.menu-item(:class="{ 'menu-item--active': active }")
  .menu-item__icon(v-if="item?.type === 'item'")
    svg(width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg")
      path(
        fill-rule="evenodd" 
        clip-rule="evenodd" 
        d="M10.0132 4.80163C11.0828 3.63904 12.9176 3.63904 13.9872 4.80164L18.6119 9.82846C19.3761 10.6591 19.8002 11.7465 19.8002 12.8752V16.8711C19.8002 18.6937 18.3227 20.1711 16.5002 20.1711H14.4002C13.4061 20.1711 12.6002 19.3652 12.6002 18.3711V15.9711H11.4002V18.3711C11.4002 19.3652 10.5943 20.1711 9.60019 20.1711H7.5002C5.67766 20.1711 4.2002 18.6937 4.2002 16.8711V12.8752C4.2002 11.7465 4.62433 10.6591 5.38851 9.82846L10.0132 4.80163ZM12.6625 6.02034C12.306 5.6328 11.6944 5.6328 11.3379 6.02034L6.71318 11.0472C6.25468 11.5455 6.0002 12.198 6.0002 12.8752V16.8711C6.0002 17.6995 6.67177 18.3711 7.5002 18.3711H9.60019V15.9711C9.60019 14.977 10.4061 14.1711 11.4002 14.1711H12.6002C13.5943 14.1711 14.4002 14.977 14.4002 15.9711V18.3711H16.5002C17.3286 18.3711 18.0002 17.6995 18.0002 16.8711V12.8752C18.0002 12.198 17.7457 11.5455 17.2872 11.0472L12.6625 6.02034Z" 
        :fill="active ? 'white' : '#98989A'")
  .menu-item__label
    span {{ item?.title || '' }}
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  // Types
  import type { SidebarMenuItem } from '@app-types/sidebar.type'

  const props = defineProps<{
    active?: Boolean, 
    item?: SidebarMenuItem
  }>()

  const { active, item } = toRefs(props)
</script>

<style scoped lang="scss">
.menu-item {
  display: flex;
  height: 48px;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-radius: $br-radius-main;
  color: $text-color-main;
  background-color: transparent;
  cursor: pointer;
  line-height: 24px;
  // font-size: 15px;
  overflow: hidden;

  &__label {
    text-wrap: nowrap;
  }

  &--active {
    background-color: #5575F2;
    color: white;
  }  
}
</style>