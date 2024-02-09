import { defineStore } from 'pinia'
import { ProfileStore } from '@/types/stores.type'

export const useMainStore = defineStore('profile', {
  state: (): ProfileStore => ({}),
  getters: {},
  actions: {}
})


