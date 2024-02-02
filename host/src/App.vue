<template lang="pug">
#__app
  div(v-if="!store.$auth.authenticated")
  router-view(v-else)
</template>

<script setup lang="ts">
  import { useMainStore }  from '@/stores/main'

  const store = useMainStore()
</script>

<style lang="scss" scoped>
#__app {
  width: 100%;
  height: 100%;
}
</style>
