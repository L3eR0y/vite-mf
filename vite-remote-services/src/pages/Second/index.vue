
<template lang="pug">
div
  ServiceComponent
</template>

<script setup lang="ts">
import { Vue2ComponentWrapper } from '@/utils/index'
import KitApp from 'kit/App'

const ServiceComponent: any =  Vue2ComponentWrapper(KitApp, 'kit-app')

</script>
