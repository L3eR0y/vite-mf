<template lang="pug">
div {{ c1 }} {{ c2 }}
</template>
    
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useExpirements } from '../../composables'

const { actions, getters } = useExpirements()

const c1 = computed(() => {
  return getters?.ex1() || 0
})

const c2 = computed(() => {
  return getters?.ex2() || 0
})
</script>

<style lang="scss" scoped></style>