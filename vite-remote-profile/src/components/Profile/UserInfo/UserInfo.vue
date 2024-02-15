<template lang="pug">
.user-info-wrapper
  .avatar
    AvatarPicker(:src="avatar")
  .initials
    .initials__second-name  {{ first_name }}
    .initials__first-name  {{ last_name }}
    .initials__middle-name  {{ middle_name }}
  .contacts
    .contacts__title Контактная иформация
    .contacts__list
      .contact 
        .icon
          svg(width="24" height="24")
            use(xlink:href="@/assets/images/sprite.svg#mail")
        .label {{ email }}
      .contact 
        .icon
          svg(width="24" height="24")
            use(xlink:href="@/assets/images/sprite.svg#communications")
        .label {{ phone }}
      .contact 
        .icon
          svg(width="24" height="24")
            use(xlink:href="@/assets/images/sprite.svg#communications")
        .label {{ additional_phone }}
</template>

<script setup lang="ts">
import AvatarPicker from '@/components/AvatarPicker/AvatarPicker.vue'
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

const avatar = computed(() => {
  return profile_store?.profile?.attributes?.avatar?.url || ''
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
  position: relative;
  justify-content: center;
  height: 160px;
  width: 100%;

  &__button {
    position: absolute;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: #f5f5f5;
    overflow: hidden;
    border-radius: 50%;
    border: none;
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
  gap: 12px;
  margin-bottom: rem(16);
  &:last-child {
    margin-bottom: 0;
  }
}

</style>
  