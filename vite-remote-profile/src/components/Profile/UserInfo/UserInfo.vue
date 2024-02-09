<template lang="pug">
.user-info-wrapper
  .avatar
    .av
  .initials
    .initials__second-name  {{ first_name }}
    .initials__first-name  {{ last_name }}
    .initials__middle-name  {{ middle_name }}
  .contacts
    .contacts__title Контактная иформация
    .contacts__list
      .contact {{ email }}
      .contact {{ phone }}
      .contact {{ additional_phone }}
</template>

<script setup lang="ts">
import { useProfileStore }  from '@/stores/profile'
import { computed } from 'vue'

const profile_store = useProfileStore()

const first_name = computed(() => {
  return profile_store?.profile?.attributes?.name?.first || ''
})

const last_name = computed(() => {
  return profile_store?.profile?.attributes?.name?.last || ''
})

const middle_name = computed(() => {
  return profile_store?.profile?.attributes?.name?.middle || ''
})

const phone = computed(() => {
  return profile_store?.profile?.attributes?.phone || ''
})

const additional_phone = computed(() => {
  return profile_store?.profile?.attributes?.additional_phone || ''
})

const email = computed(() => {
  return profile_store?.profile?.attributes?.email || ''
})
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
  