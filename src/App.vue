<template lang="pug">
.app-wrapper
    .app-wrapper--side_bar
        router-link(to="/home") Home
    .app-wrapper--view-container
        router-view
</template>

<script setup lang="ts">
    const props = defineProps({
        first_simple_prop: {
            type: String,
            required: false
        },
        second_simple_prop: {
            type: Number,
            required: false
        },
        third_simple_prop: {
            type: [Array, Object],
            required: false,
            default: () => ([1,2,3])
        }
    })
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