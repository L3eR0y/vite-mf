<template lang="pug">
.accordion-wrapper
  .accordion-wrapper__head
    slot(name="head")
  .accordion-wrapper__body
    slot(name="body")
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.accordion-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;

  &__body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    font-weight: 400;
    margin-left: 15px;
    padding-left: 15px;
    padding-top: 4px;
    border-left: 1px #5575F2 solid;
  }
}
</style>