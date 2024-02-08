<template lang="pug">
.user-info-wrapper
  .avatar
    .av
  .initials
    .initials__second-name  {{ store.user.family_name }}
    .initials__first-name  {{ store.user.given_name }}
    .initials__middle-name  {{ '' }}
  .contacts
    .contacts__title Контактная иформация
    .contacts__list
      .contact vkovalev@synergy.ru
      .contact +7 (967) 157-51-80
      .contact +7 (967) 157-51-81
      .contact +7 (967) 157-51-82

</template>

<script setup lang="ts">
import { useMainStore }  from '@/stores/main'
const store = useMainStore()

</script>

<style scoped lang="scss">
.user-info-wrapper {
  padding: rem(24) rem(20);
  width:100%;
  height: 100;

  display: flex;
  flex-direction: column;
  gap: 28px;
}

.avatar {
  display: flex;
  justify-content: center;
  height: 160px;
  width: 100%;

  & .av {
    height: 160px;
    width: 160px;
    background-color: black;
    border-radius: 50%;
  }
}

.contacts {
  &__title {
    font-weight: 500;
    font-size: rem(16);
    line-height: rem(22);
    color: $color-text-secondary;
    margin-bottom: rem(16);
  }

  &_list {
    display: flex;
    flex-direction: column;
  }
}

.initials {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
}

.contact {
  display: flex;
  align-items: center;
  margin-bottom: rem(16);
  &:last-child {
    margin-bottom: 0;
  }
}

</style>
  