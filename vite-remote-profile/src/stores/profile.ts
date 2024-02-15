import { defineStore } from 'pinia'
import ProfileStore from '@/types/Profile/profile.store.type'

export const useProfileStore = defineStore('profile', {
  state: (): ProfileStore => ({
    profile: {},
    user: {}
  }),
  getters: {},
  actions: {}
})


