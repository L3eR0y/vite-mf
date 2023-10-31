<template lang="pug">
div Expirements
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from '../../composables'

const state = useMainStore()

onMounted(() => {
    console.log('EXP STATE: ', state)
})
</script>

<style lang="scss" scoped></style>