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
      SButton
      .profile-tabs-wrapper
        .profile-tabs-wrapper__head
          .tabs
            .tab.tabs__tab(
              v-for="tab in tabs" 
              :key="tab.code" 
              :class="{ 'tabs__tab--active': active_tab === tab.code }"
              @click="onTabClick(tab)") 
                .tab__label {{ tab.title || '' }}
        .profile-tabs-wrapper__body
          transition(name="slide")
            KeepAlive
              component(:is="component_tab" :profile="tabs_profile")
      //- ProfileTabs(:profile="{}")
</template>

<script setup lang="ts">
import _ from 'lodash'
import { ref, reactive, computed, onMounted } from 'vue'
import { useMainStore }  from '@/stores/main'
import { useProfileStore }  from '@/stores/profile'
import UserInfo from '@components/Profile/UserInfo/UserInfo.vue'
import PersonalDoc from '@components/Profile/ProfileTabs/Tabs/PersonalDoc/PersonalDoc.vue'
import PersonalData from '@components/Profile/ProfileTabs/Tabs/PersonalData/PersonalData.vue'
import Addresses from '@components/Profile/ProfileTabs/Tabs/Addresses/Addresses.vue'


import coverBackground1 from '@/assets/images/profile/bg1.png'
import coverBackground2 from '@/assets/images/profile/bg2.png'
import coverBackground3 from '@/assets/images/profile/bg3.png'

const store = useMainStore()
const profile_store = useProfileStore()

const active_background_image_id = ref<number>(0)
const active_tab = ref<string>('PersonalData')
let tabs_profile = ref<Profile>({})

const tabs: ProfileTabs = {
	PersonalData: {
		code: 'PersonalData',
		title: 'Контактные данные',
		component: PersonalData
	},
	PersonalDoc: {
		code: 'PersonalDoc',
		title: 'Документы',
		component: PersonalDoc
	},
	Addresses: {
		code: 'Addresses',
		title: 'Адреса',
		component: Addresses
	}
}

const background_images: string[] = reactive([
  coverBackground1,
  coverBackground2,
  coverBackground3
])

const background_image: any = computed(() => {
  return `url(${background_images[active_background_image_id.value]})`
})

const component_tab = computed(() => {
	return tabs?.[active_tab.value as keyof ProfileTabs]?.component || null
})

function onTabClick(tab: { code: string, title: string }): void {
	active_tab.value !== tab.code && (active_tab.value = tab.code)
}

function onCoverMenuClick() {
  //TODO: Temp, rework it
  active_background_image_id.value === 0 
    ? active_background_image_id.value = 1
    : active_background_image_id.value === 1
      ? active_background_image_id.value = 2 
      : active_background_image_id.value = 0
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
    tabs_profile.value = _.cloneDeep(profile)
    return profile
  })
}

onMounted(() => {
  searchProfile()
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


.profile-tabs-wrapper {
  background-color: $color-bg-primary;
	width: 100%;
	height: 100%;
  // @media (max-width: 1365px) {
  //   max-width: 100%;
  // }
}

.tabs {
	display: flex;
  width: 100%;
  margin-bottom: rem(24);
  @include phone {
    display: none;
  }

	&__tab {
		position: relative;
    font-size: rem(16);
    line-height: rem(22);
    cursor: pointer;

		&--active {
      color: $color-text-primary !important;
			border-bottom: 2px $color-button-normal solid !important;
		}
	}
}

.tab {
	display: flex;
	flex-direction: column;
	color: $color-text-secondary;
	border-bottom: 2px solid $color-button-disabled;

	&__label {
		padding: rem(1) rem(8);
		margin-bottom: 12px;
	}
}
</style>
