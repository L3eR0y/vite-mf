import { defineStore } from 'pinia'
import Keycloak from 'keycloak-js'

export const useMainStore = defineStore('main', {
  state: () => ({
    $auth: {} as Keycloak,
    user: {} as Keycloak.KeycloakProfile,
    sidebar: {
      minimized: false
    },
    ex_field: 'example string field',
  }),
  getters: {
    auth: (state) => state.$auth,
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
