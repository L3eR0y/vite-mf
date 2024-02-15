<template lang="pug">
.form__header 
    .navigation
      .navigation__item(@click="onToAllDocumentsClick")
        img(:src="getLeftArrowSrc()")
        span Все документы
</template>

<script>
export default {
  name: 'FormHeader',

  methods: {
    getLeftArrowSrc() {
      return require('~/assets/icons/services/profile/documents/left-arrow.svg')
    },
    onToAllDocumentsClick() {
      this.$emit('to-all-documents')
    },
  },
}
</script>

<style lang="scss" scoped>
$button-height: 40px;

.form__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -15px;
  height: $button-height;
}
.navigation {
  padding: 4px 8px;

  font-family: Rubik;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;

  display: flex;
  align-items: center;

  cursor: pointer;

  &__item {
    & img {
      width: 24px;
      height: 24px;
    }
    & span {
      margin-left: 8px;
    }
  }
}
</style>
