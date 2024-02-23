<template lang="pug">
.navigation-bar-wrapper
  .left-side-container
    Search
  .right-side-container
    .right-side-container__avatar 
      AccountCircleOutline.icon(fill-color="#353741" :size="46")
    .right-side-container__notification
      BellBadgeOutline.icon(fill-color="#98989A")
    .right-side-container__messages
      MessageTextOutline.icon(fill-color="#98989A")
</template>

<script setup lang="ts">
import Search from '@components/Search/Search.vue'
import BellBadgeOutline from 'vue-material-design-icons/BellBadgeOutline.vue'
import MessageTextOutline from 'vue-material-design-icons/MessageTextOutline.vue'
import AccountCircleOutline from 'vue-material-design-icons/AccountCircleOutline.vue'

</script>

<style scoped lang="scss">
.navigation-bar-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
}

.left-side-container {
  width: 100%;
  flex-grow: 1;
}

.right-side-container {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 24px;

  &__notification, &__messages, &__avatar {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.icon {
  cursor: pointer;
}
</style>