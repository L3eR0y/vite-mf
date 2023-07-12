<template lang="pug">
.app-wrapper
    div 
        h1 TS-HOST
    div
        remote-app
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.app-wrapper {
    display: flex;
    height: 100%;

    &--side_bar {
        width: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px black solid;
    }

    &--view-container {
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px black solid;
    }
}
</style>