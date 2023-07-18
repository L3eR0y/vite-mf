<template lang="pug">
.navigation-bar.navigation-bar__wrapper 
  h1 TS-HOST HEADER
  h1 AUTH: {{ $keycloak.authenticated }}
</template>
  
<script setup lang="ts">
  import {ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  
  onMounted(() => {
      console.log('Header Mounted')
  })
  </script>
  
<style scoped lang="scss">
  .navigation-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 3.5rem;
    
    &__wrapper {
      box-shadow: 0 .125rem 1rem 0 rgba(0,0,0, .05);
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
</style>