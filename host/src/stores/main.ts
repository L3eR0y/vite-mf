import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    authentication: {},
    user: {
      first_name: 'ExampleFirstName',
      second_name: 'ExampleSecondName',
      middle_name: 'ExampleMiddleName'
    },
    sidebar: {
      minimized: false
    },
    ex_field: 'example string field',
  }),
  getters: {
    auth: (state) => state.authentication,
    first_name: (state) => state.user.first_name,
    second_name: (state) => state.user.second_name,
    middle_name: (state) => state.user.middle_name,
    full_name: (state) => `${state.user.second_name} ${state.user.first_name} ${state.user.middle_name}`,
    sidebar_minimized: (state) => state.sidebar.minimized
  },
  actions: {
    showSidebar() {
      this.sidebar.minimized = false
    },
    hideSidebar() {
      this.sidebar.minimized = true
    }
  }
})
