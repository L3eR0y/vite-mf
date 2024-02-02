<template>
  <component
    :is="avatarData.component || 'img'"
    class="avatar-image rounded-circle"
    :style="{
      color: avatarData.color,
    }"
    :src="avatarData.src"
    :width="width"
    :height="height"
    :alt="alt"
  />
</template>

<script>
export default {
  props: {
    avatarData: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
    alt: {
      type: String,
      default: "",
    },
  },
};
</script>
