<template lang="pug">
router-view
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'

// onMounted(() => {
//     console.log('Mounted')
//     useRouter().push({
//         name: 'index'
//     })
// })
</script>

<style scoped lang="scss"></style>