<template lang="pug">
.accordion-wrapper
  .accordion-wrapper__head(@click="onAccordionHeadClick") 
    slot(name="head") {{ item.title || 'Empty' }}
  transition(name="accordion")
    .accordion-body(v-if="item.submenu && item.submenu.length > 0 && expanded")
      slot(name="body")
        .accordion-submenu
          .accordion-submenu__element(v-for="(subitem, index) in item.submenu" :key="index") {{ subitem.title }}
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, toRefs } from 'vue'

const props = defineProps({
    item: {
      type: Object,
      required: false,
      default: () => {}
    },
    expanded: {
      type: Boolean,
      defaul: false
    }
})

const { expanded, item } = toRefs(props)

let submenu_visibility = ref(false)

function onAccordionHeadClick():void {
    submenu_visibility.value = !submenu_visibility.value
}

onMounted(() => {
    console.log('EXPANDED: ', expanded.value, item.value)
})
</script>

<style lang="scss" scoped>
.accordion-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__head {
      width: 100%;
    }
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