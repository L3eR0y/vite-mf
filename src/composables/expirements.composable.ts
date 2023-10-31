import { toRefs } from 'vue'
import { state, actions, getters } from '../stores/expirements/state'

export const useExpirements = () => {
  return {
    ...toRefs(state),
    actions,
    getters
  }
}