<template lang="pug">
.accordion-wrapper
    .accordion-wrapper__head(@click="onAccordionHeadClick") 
        slot(name="head") {{ element.title }}
    transition(name="accordion")
        .accordion-body(v-if="element.submenu.length > 0 && submenu_visibility")
            slot(name="body")
                .accordion-submenu
                    .accordion-submenu__element(v-for="(item, element) in element.submenu" :key="index") {{ item.title }}
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SidebarMenu } from '@/types/sidebar.type'

const props = defineProps({
    element: {
        type: Object,
        required: true,
        default: () => {}
    }
})

let submenu_visibility: boolean = ref(false)

function onAccordionHeadClick():void {
    submenu_visibility.value = !submenu_visibility.value
}
</script>

<style lang="scss" scoped>
.accordion-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.accordion-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    
}

.accordion-submenu {
    margin-left: 1rem;
    border-left: 1px solid #FFBABC;

    &__element {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
        text-overflow: ellipsis;
        overflow-x: hidden;
    }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0px;
}

.accordion-leave-from,
.accordion-enter-to {
    max-height: 2000px;
}


</style>