<template lang="pug">
.avatar-picker-wrapper
  img.avatar-picker-wrapper__avatar(:src="avatar")
  button.avatar-picker-wrapper__button
    svg(width="24" height="24")
        use(xlink:href="@/assets/images/sprite.svg#camera")
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import AvatarPlaceholder from '@/assets/images/profile/user-photo-placeholder.svg'

const props = defineProps<{ 
	src: {
		type: string,
		required: false,
		default: ''
	}
}>()

const { src } = toRefs(props)

const avatar = computed(() => {
  return src.value || AvatarPlaceholder
})
</script>

<style lang="scss" scoped>
.avatar-picker-wrapper {
  position: relative;
  height: 160px;
  width: 160px;

  &__avatar {
    height: 100%;
    width: 100%;
  }

  &__button {
    position: absolute;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #f5f5f5;
    overflow: hidden;
    border-radius: 50%;
    border: none;
    bottom: 5px;
    right: 5px;
  }
}
</style>