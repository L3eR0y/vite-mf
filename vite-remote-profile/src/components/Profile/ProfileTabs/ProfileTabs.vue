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
				component(:is="component_tab")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PersonalDoc from '@components/Profile/ProfileTabs/Tabs/PersonalDoc.vue'
import PersonalData from '@components/Profile/ProfileTabs/Tabs/PersonalData.vue'
import Addresses from '@components/Profile/ProfileTabs/Tabs/Addresses.vue'


const active_tab = ref('PersonalData')

const tabs: { [key: string]: { code: string, title: string, component: any } } = {
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

const component_tab = computed(() => {
	return tabs?.[active_tab.value]?.component || null
})

function onTabClick(tab: { code: string, title: string }): void {
	active_tab.value !== tab.code && (active_tab.value = tab.code)
}
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