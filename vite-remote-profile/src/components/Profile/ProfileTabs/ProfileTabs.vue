<template lang="pug">
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
				component(:is="component_tab" :profile="{}")
</template>

<script setup lang="ts">
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useProfileStore }  from '@/stores/profile'


const profile_store = useProfileStore()

const active_tab = ref('PersonalData')



const component_tab = computed(() => {
	return tabs?.[active_tab.value]?.component || null
})

function onTabClick(tab: { code: string, title: string }): void {
	active_tab.value !== tab.code && (active_tab.value = tab.code)
}

// async function  updateProfile(profile: Profile): Promise<any> {
//     // const profile = {
//     //   type: 'users/profiles',
//     //   attributes: getAttributes(state.user, target),
//     // }
//     // return this.$axios
//     //   .patch(`${this.$config.PROFILE__API_URL}/users/profiles/${state.profile.id}`, {
//     //     data: profile,
//     //   })
//     //   .then((response) => {
//     //     commit('updateProfileFields', response.data)
//     //     return response.data
//     //   })
//     //   .catch((e) => {
//     //     const { errors } = e.response.data
//     //     const reason = {
//     //       message: 'Неизвестстная ошибка',
//     //     }
//     //     if (errors) {
//     //       // eslint-disable-next-line
//     //       const regex = /.data.attributes\.([a-z\.]+)/g

//     //       const formErrors = errors.reduce((acc, error) => {
//     //         const fieldName = [...error.source.pointer.matchAll(regex)][0][1]
//     //         const errorText = error.detail

//     //         return { ...acc, [fieldName]: errorText }
//     //       }, {})
//     //       reason.message = 'Поля формы заполнены не верно'
//     //       reason.formErrors = formErrors
//     //     }
//     //     return Promise.reject(reason)
//     //   })
// }
</script>

<style scoped lang="scss">
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
