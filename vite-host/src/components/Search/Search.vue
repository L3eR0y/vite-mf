<template lang="pug">
.search-wrapper
  .search-wrapper__icon
    MagnifyIcon(fill-color="#98989A")
  .search-wrapper__input
</template>

<script setup lang="ts">
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
</script>

<style scoped lang="scss">
.search-wrapper {
  border-radius: $br-radius-main;
  border: 1px $br-main solid;
  width: 360px;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 10px 12px;
}
</style>