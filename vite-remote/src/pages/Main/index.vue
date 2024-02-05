<template lang="pug">
.remote-wrapper
  h1 REMOTE APP ENTRY 
  span {{ remote_hello_message }}
</template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  
  
  const remote_hello_message = ref('HELLO FROM FIRST REMOTE SERVICE!')
  </script>
  
<style scoped lang="scss">
  .remote-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
  