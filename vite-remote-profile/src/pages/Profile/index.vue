<template lang="pug">
.profile-page-wrapper
  .profile-page-wrapper__cover(:style="{ 'background-image': background_image }")
  .profile-page-wrapper__cover-menu
    button.cover-btn(@click="onCoverMenuClick")
      span Изменить обложку
  .profile-page-wrapper__profile
    .user-info.column
      UserInfo
    .profile-tabs.column
      ProfileTabs
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useMainStore }  from '@/stores/main'
import { useProfileStore }  from '@/stores/profile'
import UserInfo from '@components/Profile/UserInfo/UserInfo.vue'
import ProfileTabs from '@components/Profile/ProfileTabs/ProfileTabs.vue'

import coverBackground1 from '@/assets/images/profile/bg1.png'
import coverBackground2 from '@/assets/images/profile/bg2.png'
import coverBackground3 from '@/assets/images/profile/bg3.png'

const active_background_image_id = ref<number>(0)
const store = useMainStore()
const profile_store = useProfileStore()

const background_images: any[] = reactive([
  coverBackground1,
  coverBackground2,
  coverBackground3
])

const background_image: any = computed(() => {
  return `url(${background_images[active_background_image_id.value]})`
})

function onCoverMenuClick() {
  //TODO: Temp, rework it
  active_background_image_id.value === 0 
    ? active_background_image_id.value = 1
    : active_background_image_id.value === 1
      ? active_background_image_id.value = 2 
      : active_background_image_id.value = 0
  console.log('ID ->: ', active_background_image_id.value)
}

function searchProfile() {
  return fetch(`${import.meta.env.VITE_PROFILE__API_URL}/users/profiles/?filter[relationships.user]=${ store.$auth.subject }`, {
    method: 'GET',
    headers: {
      Authorization: store.$auth.token || '',
    },
  })
  .then(resp => resp.json())
  .then((data: any) => {
    const profile = data?.data?.[0] || null
    profile_store.profile = profile
    return profile
  })
}

onMounted(() => {
  searchProfile().then((profile: Profile) => {
    console.log('PROFILE: ', profile)
  })
})
</script>

<style scoped lang="scss">
.profile-page-wrapper {
  @include scroll();
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: rem(148) rem(20) rem(20) rem(16);

  &__cover {
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    height: 340px;
    width: 100%;
    background-color: transparent;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &__cover-menu {
    position: absolute;
    top: rem(25);
    right: rem(20);
    z-index: 1;
  }

  &__profile {
    position: relative;
    display: flex;
    justify-content: center;
    min-height: 200px;
    display: flex;
    gap: 1rem;
  }
}

.cover-btn {
  background-color: $color-bg-primary;
  padding: rem(8);
  display: flex;
  align-items: center;
  border-radius: rem(4);
  cursor: pointer;
  border: 1px solid #0D1140;
}

.user-info {
  width: rem(300);
  flex-shrink: 0;
}

.profile-tabs {
  width: 100%;
  max-width: 720px;
  padding: 24px 20px;
}

.column {
  background-color: #fff;
  border-radius: rem(8);
  border: 1px solid #D4D6DB;
}
</style>
