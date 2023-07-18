<template lang="pug">
router-view
</template>

<script setup lang="ts">
import {ref, onMounted, inject} from 'vue'
import { useRouter } from 'vue-router'

const keycloak = inject('keycloak')

onMounted(() => {
    console.log('Init auth', keycloak)
    // keycloak?.init?.({ onLoad: 'login-required' }).then((auth: Boolean) => {
    //     if (!auth) {
    //         console.log('AUTH: ', auth)
    //     } else {
    //         console.log('AUTH: ', auth)
    //         useRouter().push({
    //             name: 'index'
    //         })
    //     }
    // })
})
</script>

<style scoped lang="scss"></style>