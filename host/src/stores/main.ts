import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    authentication: {},
    user: {
      first_name: 'ExampleFirstName',
      second_name: 'ExampleSecondName',
      middle_name: 'ExampleMiddleName'
    },
    ex_field: 'example string field',
  }),
  getters: {
    auth: (state) => state.authentication,
    first_name: (state) => state.user.first_name,
    second_name: (state) => state.user.second_name,
    middle_name: (state) => state.user.middle_name,
    full_name: (state) => `${state.user.second_name} ${state.user.first_name} ${state.user.middle_name}`
  },
  actions: {}
})
