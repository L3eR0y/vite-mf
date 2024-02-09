import { defineStore } from 'pinia'
import { MainStore } from '@/types/stores.type'
import Keycloak from 'keycloak-js'

export const useMainStore = defineStore('main', {
  state: (): MainStore => ({
    $auth: {} as Keycloak,
    user: {} ,
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
