import { defineStore } from 'pinia'
import MainStore from '@/types/main-store.type'
import Keycloak, { KeycloakProfile } from 'keycloak-js'

export const useMainStore = defineStore('main', {
  state: (): MainStore => ({
    $auth: {} as Keycloak,
    user: {} as KeycloakProfile,
    sidebar: {
      minimized: false
    },
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
