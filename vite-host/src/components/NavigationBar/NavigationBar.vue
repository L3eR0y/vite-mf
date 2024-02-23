<template lang="pug">
.navigation-bar-wrapper
  .content
    Search
  .avatar
</template>

<script setup lang="ts">
import Search from '@components/Search/Search.vue'
</script>

<style scoped lang="scss">
.navigation-bar-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
}

.content {
  width: 100%;
  flex-grow: 1;
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px $br-main solid;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>