<template lang="pug">
template(v-if="!isAuthenticated")
    div {{ isAuthenticated }}
template(v-else)
    router-view
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore, useKeycloak } from './composables'

const { isAuthenticated } = useKeycloak()
const state = useMainStore()


onMounted(() => {
    console.log('APP STATE: ', state)
})
</script>

<style scoped lang="scss"></style>