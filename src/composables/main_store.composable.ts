import { MainStore, MainStoreComposable } from '../../types/main.store'
import { state, getters, actions } from '../stores/main/state'
import { toRefs } from 'vue'


export const useMainStore = (): MainStoreComposable => {
  return {
    ...toRefs<MainStore>(state),
    getters,
    actions
  }
}

