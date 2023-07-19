<template lang="pug">
template(v-if="!isAuthenticated")
    div {{ isAuthenticated }}
template(v-else)
    router-view
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useKeycloak } from './auth/keycloak.composable'

const { isAuthenticated } = useKeycloak()

onMounted(() => {})
</script>

<style scoped lang="scss"></style>