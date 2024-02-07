<template lang="pug">
#__app
  router-view(v-if="store.auth.authenticated")
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
    