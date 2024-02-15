<template lang="pug">
.presonal-data-tab-wrapper 
  .fieldset
    .fieldset__title Основная информация
    .fieldset__content
      .field {{ profile.attributes?.name?.last || '' }}
      .field {{ profile.attributes?.name?.first || '' }}
      //- .field {{ pr.attributes?.name?.middle || '' }}
</template>

<script setup lang="ts">
import { toRefs, onMounted } from 'vue'

// const props = defineProps<{
//   profile: Profile
// }>()

const props = defineProps({
  profile: { type: Object, required: true} 
})

const { profile } = toRefs(props)


onMounted(() => {
  console.log('PROFILE: ', profile.value)
})

</script>

<style scoped lang="scss">
.presonal-data-tab-wrapper {
  height: 100%;
  width: 100;
}

.fieldset {
  &__title {
    font-weight: 500;
    font-size: 22px;
    line-height: 30px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
  